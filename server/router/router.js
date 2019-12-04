const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

	const usercontroller = require('../controller/user.controller');
	const bookusercontroller = require('../controller/bookuser.controller')
	const bookadmincontroller = require('../controller/bookadmin.controller')
	const author_categorycontroller = require('../controller/addauthor_category.controller')

	app.post('/api/auth/signup', [verifySignUp.checkDuplicateEmail,verifySignUp.checkErrorEmail, verifySignUp.checkPassword], usercontroller.signup);
	
	app.post('/api/auth/signin', usercontroller.signin);
	
	// app.get('/api/test/user', [authJwt.verifyToken], usercontroller.testUser);
	
	// app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], usercontroller.testAmin);

	app.post('/api/own/book/add',[authJwt.verifyToken],bookusercontroller.addBookUser);

	app.post('/api/own/book/list',[authJwt.verifyToken],bookusercontroller.listBook);

	app.delete('/api/own/book/delete',[authJwt.verifyToken],bookusercontroller.deleteBookUser);

	app.post('/api/admin/books/add',bookadmincontroller.addBookAdmin);

	app.put('/api/admin/books/edit',/*[authJwt.verifyToken, authJwt.isAdmin],*/bookadmincontroller.editBookAdmin);

	app.delete('/api/admin/books/delete',[authJwt.verifyToken, authJwt.isAdmin],bookadmincontroller.deleteBookAdmin);

	app.get('/api/admin/books/list',[authJwt.verifyToken, authJwt.isAdmin],bookadmincontroller.pagination);

	app.post('/api/admin/author/add',/*[authJwt.verifyToken, authJwt.isAdmin],*/author_categorycontroller.addAuthor);
	
	app.post('/api/admin/category/add',/*[authJwt.verifyToken, authJwt.isAdmin],*/author_categorycontroller.addCategory);
}
