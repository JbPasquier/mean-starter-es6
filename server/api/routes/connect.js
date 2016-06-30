import User from '../models/user.js';
import Auth from '../middlewares/authorization.js';

module.exports = (app) => {

	app.get('/loggedin', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
	});

	app.post('/login', User.connect);

}
