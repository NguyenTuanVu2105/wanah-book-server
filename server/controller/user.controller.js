const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
var avatar = "./asset/default_avatar.png";
const Profile = db.profile;
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	Profile.create({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		is_Admin: false
	}).then(user => {
				const profileFields = {};
				profileFields.userId = user.id;
				if (req.body.first_name) profileFields.first_name = req.body.first_name;
				if (req.body.last_name) profileFields.last_name = req.body.last_name;
				if (req.body.address) profileFields.address_detail = req.body.address;
				if (req.body.lat) profileFields.address_latitude = req.body.lat;
				if (req.body.lng) profileFields.address_longitude = req.body.lng;
				new Profile(profileFields).save().then(profile =>res.status(200).send({success: true})).catch(err => console.log(err));
            })
	.catch(err => {
		res.status(500).send({message : err});
	})
}
exports.signup = (req, res) => {
	Profile.create({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		address_detail: req.body.address,
		address_latitude: req.body.lat,
		address_longitude: req.body.lng
	}).then(profile => {
		User.create({
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
			is_Admin: false,
			profileId: profile.id
		})		
		.then(user =>res.status(200).send({success: true})).catch(err => console.log(err));
            })
	.catch(err => {
		res.status(500).send({message : err});
	})
}

exports.signin = (req, res) => {
	console.log("Sign-In");
	
	User.findOne({
		where: {
			email: req.body.email
		}, 
		include: [{
			model: Profile
		}]
	}).then(user => {
		if (!user) {
			return res.status(404).send({message:"Email không tồn tại"});
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({message:"Password không đúng"});
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  	expiresIn: 86400 // token hết hạn sau 24 giờ
		});

		res.send({ Success : true, accessToken: token,id: user.id,name:user.profile.first_name+ " " + user.profile.last_name, avatar : avatar})
		
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