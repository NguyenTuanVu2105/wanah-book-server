const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

	const usercontroller = require('../controller/user.controller');
	const profilecontroller = require('../controller/profile.controller');
	const bookcontroller = require('../controller/book.controller')
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateEmail,verifySignUp.checkErrorEmail, verifySignUp.checkPassword], usercontroller.signup);
	
	app.post('/api/auth/signin', usercontroller.signin);
	
	// app.get('/api/test/user', [authJwt.verifyToken], usercontroller.testUser);
	
	// app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], usercontroller.testAmin);

	// app.post('/api/update/profile', [authJwt.verifyToken], profilecontroller.CreateUserProfile);

	app.post('/api/book/add',bookcontroller.addBook);

	app.post('/api/book/edit',bookcontroller.editBook);

	app.delete('/api/book/delete',bookcontroller.deleteBook);
}
