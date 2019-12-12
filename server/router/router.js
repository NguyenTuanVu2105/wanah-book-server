const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

	const usercontroller 		= require('../controller/user.controller');
	const profile 				= require('../controller/profile.controller');
	const bookusercontroller 	= require('../controller/bookuser.controller');
	const bookadmincontroller 	= require('../controller/bookadmin.controller');
	const authorcontroller 		= require('../controller/author.controller');
	const categorycontroller 	= require('../controller/category.controller');
	const reviewcontroller 		= require('../controller/review.controller');
	const borrowcontroller 		= require('../controller/borrow.controller');
	const messagecontroller 	= require('../controller/message.controller');

	app.post('/api/auth/signup', [verifySignUp.checkDuplicateEmail,verifySignUp.checkErrorEmail, verifySignUp.checkPassword], usercontroller.signup);
	
	app.post('/api/auth/signin', usercontroller.signin);

	app.get('/api/auth/profile', [authJwt.verifyToken],profile.Profile);

	app.put('/api/auth/editprofile', [authJwt.verifyToken],profile.editProfile);
	
	// app.get('/api/test/user', [authJwt.verifyToken], usercontroller.testUser);
	
	// app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], usercontroller.testAmin);

	app.post('/api/own/book/add',[authJwt.verifyToken],bookusercontroller.addBookUser);

	app.get('/api/own/book/list',[authJwt.verifyToken],bookusercontroller.listBook);

	app.delete('/api/own/book/delete',[authJwt.verifyToken],bookusercontroller.deleteBookUser);

	app.post('/api/admin/books/add',/*[authJwt.verifyToken, authJwt.isAdmin],*/bookadmincontroller.addBookAdmin);

	app.put('/api/admin/books/edit',/*[authJwt.verifyToken, authJwt.isAdmin],*/bookadmincontroller.editBookAdmin);

	app.delete('/api/admin/books/delete',[authJwt.verifyToken, authJwt.isAdmin],bookadmincontroller.deleteBookAdmin);

	app.get('/api/admin/books/list',[authJwt.verifyToken, authJwt.isAdmin],bookadmincontroller.pagination);

	app.post('/api/admin/author/add',/*[authJwt.verifyToken, authJwt.isAdmin],*/authorcontroller.addAuthor);

	app.put('/api/admin/author/edit',/*[authJwt.verifyToken, authJwt.isAdmin],*/authorcontroller.editAuthor);

	app.delete('/api/admin/author/delete',/*[authJwt.verifyToken, authJwt.isAdmin],*/authorcontroller.deleteAuthor);

	//app.get('/api/admin/author/list',/*[authJwt.verifyToken, authJwt.isAdmin],*/authorcontroller.pagination);
	
	app.post('/api/admin/category/add',/*[authJwt.verifyToken, authJwt.isAdmin],*/categorycontroller.addCategory);

	app.put('/api/admin/category/edit',/*[authJwt.verifyToken, authJwt.isAdmin],*/categorycontroller.editCategory);
 
	app.delete('/api/admin/category/delete',/*[authJwt.verifyToken, authJwt.isAdmin],*/categorycontroller.deleteCategory);

//	app.get('/api/admin/category/list',/*[authJwt.verifyToken, authJwt.isAdmin],*/categorycontroller.listCategory);


	// TODO: API review and vote

	app.post('/api/own/review/add', [authJwt.verifyToken], reviewcontroller.addReview);

	app.post('/api/own/vote/add', [authJwt.verifyToken], reviewcontroller.addVote);
	
	app.get('/api/admin/reviewgood/search', reviewcontroller.goodReview);
	
	app.get('/api/own/review/bybook', reviewcontroller.reviewByBook);
	
	app.get('/api/own/review/byuser', reviewcontroller.reviewByUser);
	
	app.get('/api/own/reviews/list', bookadmincontroller.pagination);
	
	// TODO: API request borrow book
	
	app.get('/api/own/status/notification', [authJwt.verifyToken], borrowcontroller.notificationStatus);
	
	app.post('/api/own/convert/borrow', [authJwt.verifyToken], borrowcontroller.convertHavedBorrow);
	
	app.post('/api/own/request/borrow', [authJwt.verifyToken], borrowcontroller.requestBorrowBook);
	
	app.get('/api/own/notification/borrow', [authJwt.verifyToken], borrowcontroller.notificationRequestBorrow);

	// TODO: API message

	app.post('/api/message/add', [authJwt.verifyToken], messagecontroller.addMessage);
	app.get('/api/message', [authJwt.verifyToken], messagecontroller.getMessage);
	
}
