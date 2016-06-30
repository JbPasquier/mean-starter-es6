import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import token from '../../token.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const model = mongoose.model('User', userSchema);

export default class User {

    connect(req, res) {
        model.findOne(req.body, {
            password: 0
        }, (err, user) => {
            if (err || !user) {
                res.sendStatus(403);
            } else {
                let tk = jsonwebtoken.sign(user, token, {
                    expiresIn: "24h"
                });
                res.json({
                    success: true,
                    user: user,
                    token: tk
                });
            }
        });
    }

    findAll(req, res) {
        model.find({}, {
            password: 0
        }, (err, users) => {
            if (err || !users) {
                res.sendStatus(403);
            } else {
                res.json(users);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, user) => {
            if (err || !user) {
                res.sendStatus(403);
            } else {
                res.json(user);
            }
        });
    }

    create(req, res) {
        model.create(req.body,
            (err, user) => {
                if (err || !user) {
                    if (err.code === 11000 || err.code === 11001) {
                        err.message = "Username " + req.body.name + " already exist";
                    }
                    res.status(500).send(err.message);
                } else {
                    res.json(user);
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, req.body, (err, user) => {
            if (err || !user) {
                res.status(500).send(err.message);
            } else {
                res.json(user);
            }
        });
    }

    delete(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        })
    }
}
