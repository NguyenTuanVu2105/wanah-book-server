const db = require('../config/db.config');
const config = require('../config/config');
var regex = require('regex-email');
const ROLES = config.ROLES; 
const User = db.user;
const Role = db.role;

checkDuplicateEmail = (req, res, next) => {
	User.findOne({ 
		where: {
			email: req.body.email
		} 
	}).then(user => {
		if(user){
			res.status(400).send("Fail -> Email is already in use!");
			return;
		}
				
		next();
	});
}
checkErrorEmail = (req, res, next) => {
	
		email = /@gmail.com/g.test(req.body.email);
		if(!email){
			res.status(400).send("Email invalid");
			return;
		}	
		next();
}
checkPassword = (req, res, next) => {
		if(req.body.password!=req.body.passwordConfirm){
			res.status(400).send("passwordConfirm is fail");
			return;
		}	
		next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateEmail = checkDuplicateEmail;
signUpVerify.checkPassword = checkPassword;
signUpVerify.checkErrorEmail = checkErrorEmail;
module.exports = signUpVerify;