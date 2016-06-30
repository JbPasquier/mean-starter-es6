import express from 'express';
import User from '../models/user.js';
import Auth from '../middlewares/authorization.js';

module.exports = (app) => {

    var user = new User();

    app.get('/loggedin', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    app.post('/login', user.connect.bind(user));

}
