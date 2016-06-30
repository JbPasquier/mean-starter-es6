import express from 'express';
import User from '../models/user.js';
import Auth from '../middlewares/authorization.js';

const userRouter = express.Router();

module.exports = (app) => {

	userRouter.get('/', Auth.isAdministrator, User.findAll);

	userRouter.get('/:id', Auth.isAdministrator, User.findById);

	userRouter.post('/', User.create);

	userRouter.put('/:id', Auth.isAdministrator, User.update);

	userRouter.delete('/:id', Auth.isAdministrator, User.delete);

    app.use('/users', userRouter);

}
