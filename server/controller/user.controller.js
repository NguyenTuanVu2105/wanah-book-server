const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
const Profile = db.profile;
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	console.log("Processing func -> SignUp");
	
	User.create({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		is_Admin: false
	}).then(
		(user) => {
			const profileFields = {};
			profileFields.userId = user.id;
			if (req.body.first_name) profileFields.first_name = req.body.first_name;
			if (req.body.last_name) profileFields.last_name = req.body.last_name;
			new Profile(profileFields).save().then(() => res.send({success: true})).catch(err => console.log(err));
		}
	).catch(err => {
		res.status(500).send(err);
	})
}

exports.signin = (req, res) => {
	console.log("Sign-In");
	
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('User Not Found.');
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  	expiresIn: 86400 // token hết hạn sau 24 giờ
		});
		
		res.status(200).send({ auth: true, accessToken: token });
		
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

exports.testUser = (req, res) => {
	User.findOne({
		where: {
			id: req.userId
		}
	}).then(user => {
		res.send(user);
	}).catch(err => console.log("error" + err));
}

exports.testAdmin = (req, res) => {
	User.findOne({
		where: {
			id: req.userId
		}
	}).then(user => {
		res.send(user);
	}).catch(err => console.log("error" + err));
}