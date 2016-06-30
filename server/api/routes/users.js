import express from 'express';
import User from '../models/user.js';
import Auth from '../middlewares/authorization.js';

const userRouter = express.Router();

module.exports = (app) => {

    var user = new User();

    userRouter.get('/', user.findAll.bind(user));

    userRouter.get('/:id', Auth.isAdministrator, user.findById.bind(user));

    userRouter.post('/', user.create.bind(user));

    userRouter.put('/:id', Auth.isAdministrator, user.update.bind(user));

    userRouter.delete('/:id', Auth.isAdministrator, user.delete.bind(user));

    app.use('/users', userRouter);

}
