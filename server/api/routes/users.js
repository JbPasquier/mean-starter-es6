import express from 'express';
import User from '../models/user.js';
import Auth from '../middlewares/authorization.js';

const userRouter = express.Router();

module.exports = (app) => {

    var user = new User();

    userRouter.get('/', Auth.isAdministrator, user.findAll);

    userRouter.get('/:id', Auth.isAdministrator, user.findById);

    userRouter.post('/', user.create);

    userRouter.put('/:id', Auth.isAdministrator, user.update);

    userRouter.delete('/:id', Auth.isAdministrator, user.delete);

    app.use('/users', userRouter);

}
