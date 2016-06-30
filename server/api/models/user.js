import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';

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
export default class User {
    constructor() {
        this.model = mongoose.model('User', userSchema)
    }

    connect(req, res) {
        this.model.findOne(req.body, {
            password: 0
        }, (err, user) => {
            if (err || !user) {
                res.sendStatus(403);
            } else {
                let token = jsonwebtoken.sign(user, 'tokenSecret', {
                    expiresIn: "24h"
                });
                res.json({
                    success: true,
                    user: user,
                    token: token
                });
            }
        });
    }

    findAll(req, res) {
        this.model.find({}, {
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
        this.model.findById(req.params.id, {
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
        this.model.create(req.body,
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
        this.model.update({
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
        this.model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        })
    }
}
