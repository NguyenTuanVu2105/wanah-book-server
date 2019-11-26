const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../config/db.config');
const Role = db.role;
const User = db.user;

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		req.userId = decoded.id;
		next();
	});
}

isAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findOne({
		where: {
			id: req.userId
		}
	}).then(user => {
		console.log(user.is_Admin);
		if(user.is_Admin === "admin") {
			next();
			return;
		}
				
		res.status(403).send("Require Admin Role!");
		return;
	});
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;

module.exports = authJwt;