const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

	const usercontroller = require('../controller/user.controller');
	const profilecontroller = require('../controller/profile.controller');

	app.post('/api/auth/signup', [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted], usercontroller.signup);
	
	app.post('/api/auth/signin', usercontroller.signin);
	
	app.get('/api/test/user', [authJwt.verifyToken], usercontroller.userContent);
	
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], usercontroller.adminBoard);

	app.post('/api/update/profile', [authJwt.verifyToken], profilecontroller.CreateUserProfile);
}