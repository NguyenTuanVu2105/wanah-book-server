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
checkRolesExisted = (req, res, next) => {	
	for(let i=0; i<req.body.roles.length; i++){
		if(!ROLES.includes(req.body.roles[i].toUpperCase())){
			res.status(400).send("Fail -> Does NOT exist Role = " + req.body.roles[i]);
			return;
		}
	}
	next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateEmail = checkDuplicateEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;
signUpVerify.checkPassword = checkPassword;
signUpVerify.checkErrorEmail = checkErrorEmail;
module.exports = signUpVerify;