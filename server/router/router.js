const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
const multer = require('multer')
const path = require("path")

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
	const contactcontroller 	= require('../controller/contact.controller');
	const admin 				= require('../controller/admin.controller');
	const imageUploader = multer({dest: 'images/'})

	app.post('/api/auth/signup', [verifySignUp.checkDuplicateEmail,verifySignUp.checkErrorEmail, verifySignUp.checkPassword], usercontroller.signup);
	
	app.post('/api/auth/signin', usercontroller.signin);

	app.get('/api/auth/profile', [authJwt.verifyToken],profile.Profile);

	app.post('/api/auth/profile/avatar', [imageUploader.single('avatar'), authJwt.verifyToken], profile.uploadAvatar)

	app.get('/api/auth/contact', [authJwt.verifyToken],contactcontroller.contactUser)

	app.put('/api/auth/editprofile', [authJwt.verifyToken],profile.editProfile);

	app.get('/api/user/bybook', [authJwt.verifyToken], bookusercontroller.listUserByBook)
	
	app.get('/api/user', [authJwt.verifyToken], contactcontroller.userDetail)

	// app.get('/api/test/user', [authJwt.verifyToken], usercontroller.testUser);
	
	// app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], usercontroller.testAmin);

	app.post('/api/own/book/add',[authJwt.verifyToken],bookusercontroller.addBookUser);

	app.get('/api/own/book/list',[authJwt.verifyToken],bookusercontroller.listBook);

	app.delete('/api/own/book/delete',[authJwt.verifyToken],bookusercontroller.deleteBookUser);
	
	app.get('/api/books/byreview', [authJwt.verifyToken],bookusercontroller.listBookOrderByReview)

	app.get('/api/books/search', [authJwt.verifyToken],bookusercontroller.searchBook)

	app.get('/api/books/searchbycategoryname', [authJwt.verifyToken],categorycontroller.searchCategoryByName)

	app.get('/api/books/searchbycategoryid', [authJwt.verifyToken],categorycontroller.searchCategoryById)

	app.get('/api/books/searchbyauthorname', [authJwt.verifyToken],authorcontroller.searchAuthorByName)

	app.get('/api/books/searchbyauthorid', [authJwt.verifyToken],authorcontroller.searchAuthorById)

	app.get('/api/auth/searchuser', [authJwt.verifyToken],usercontroller.searchUser)

	app.get('/api/book/info', [authJwt.verifyToken],bookusercontroller.infoBook)

	app.post('/api/admin/books/add',[authJwt.verifyToken, authJwt.isAdmin],bookadmincontroller.addBookAdmin);

	app.put('/api/admin/books/edit',[authJwt.verifyToken, authJwt.isAdmin],bookadmincontroller.editBookAdmin);

	app.delete('/api/admin/books/delete',[authJwt.verifyToken, authJwt.isAdmin],bookadmincontroller.deleteBookAdmin);

	app.get('/api/admin/books/list',[authJwt.verifyToken, authJwt.isAdmin],bookadmincontroller.pagination);

	app.post('/api/admin/author/add',[authJwt.verifyToken, authJwt.isAdmin],authorcontroller.addAuthor);

	app.put('/api/admin/author/edit',[authJwt.verifyToken, authJwt.isAdmin],authorcontroller.editAuthor);

	app.delete('/api/admin/author/delete',[authJwt.verifyToken, authJwt.isAdmin],authorcontroller.deleteAuthor);

	//app.get('/api/admin/author/list',[authJwt.verifyToken, authJwt.isAdmin],authorcontroller.pagination);
	
	app.post('/api/admin/category/add',[authJwt.verifyToken, authJwt.isAdmin],categorycontroller.addCategory);

	app.put('/api/admin/category/edit',[authJwt.verifyToken, authJwt.isAdmin],categorycontroller.editCategory);
 
	app.delete('/api/admin/category/delete',[authJwt.verifyToken, authJwt.isAdmin],categorycontroller.deleteCategory);

//	app.get('/api/admin/category/list',[authJwt.verifyToken, authJwt.isAdmin],categorycontroller.listCategory);


	// TODO: API review and vote

	app.post('/api/review/add', [authJwt.verifyToken], reviewcontroller.addReview);

	app.post('/api/vote/add', [authJwt.verifyToken], reviewcontroller.addVote);
	
	app.get('/api/reviewgood/search', [authJwt.verifyToken], reviewcontroller.goodReview);
	
	app.get('/api/review/bybook', [authJwt.verifyToken], reviewcontroller.reviewByBook);
	
	app.get('/api/review/byuser', [authJwt.verifyToken], reviewcontroller.reviewByUser);
	
	// app.get('/api/reviews/list', bookadmincontroller.pagination);

	app.get('/api/reviews/new', [authJwt.verifyToken], reviewcontroller.getbyNewReview);
	
	// TODO: API request borrow book
	
	app.post('/api/own/convert/borrow', [authJwt.verifyToken], borrowcontroller.convertHavedBorrow);
	
	app.post('/api/own/request/borrow', [authJwt.verifyToken], borrowcontroller.requestBorrowBook);

	app.post('/api/own/convert/return', [authJwt.verifyToken], borrowcontroller.isReturnBook);

	app.get('/api/requests', [authJwt.verifyToken], borrowcontroller.getRequestsIncoming);

	app.post('/api/request/accept', [authJwt.verifyToken], borrowcontroller.acceptRequest);

	app.post('/api/request/deny', [authJwt.verifyToken], borrowcontroller.denyRequest);

	app.get('/api/request', [authJwt.verifyToken], borrowcontroller.getRequestDetail);
	// TODO: API message

	app.post('/api/message/add', [authJwt.verifyToken], messagecontroller.addMessage);
	app.get('/api/message', [authJwt.verifyToken], messagecontroller.getMessage);
	
	app.get('/api/contacts', [authJwt.verifyToken], messagecontroller.getAllContact);
	// TODO: API Admin

	app.get('/api/user/all', /* [authJwt.verifyToken, authJwt.isAdmin], */ admin.viewAllUser);
	app.get('/api/book/all', /* [authJwt.verifyToken, authJwt.isAdmin], */ admin.viewAllBook);
	app.get('/api/review/all', /* [authJwt.verifyToken, authJwt.isAdmin], */ admin.viewAllReview);
	app.get('/api/total/detail', /* [authJwt.verifyToken, authJwt.isAdmin], */ admin.totalInformationDetail);
	
	app.get('/:name', (req, res) => {
		const fileName = req.params.name
		if (!fileName) {
			return res.send({
				status: false,
				message: 'no filename specified',
			})
		}
		res.sendFile(path.resolve(`./images/${fileName}`))
	})
}
