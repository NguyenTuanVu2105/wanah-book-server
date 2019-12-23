const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
var avatar = "default_avatar.jpg";
const Profile = db.profile;
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	Profile.create({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		address_detail: req.body.address,
		address_latitude: req.body.lat,
		address_longitude: req.body.lng,
		avatar: avatar
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

		res.send({ Success : true, accessToken: token,id: user.id,name:user.profile.first_name+ " " + user.profile.last_name, avatar : user.profile.avatar})
		
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
exports.searchUser = (req, res) => {
	var q = req.query.name
	var limit = parseInt(req.query.limit)
    var page = parseInt(req.query.page)
    User.findAll(
        {
			limit: limit,
            offset: (page-1)*limit,
			attributes: [
				'id',
				[db.sequelize.literal(`(SELECT 111111 *
					DEGREES(ACOS(LEAST(1.0, COS(RADIANS(21.04166030883789))
						 * COS(RADIANS(address_latitude))
						 * COS(RADIANS(105.78498840332031 - address_longitude))
						 + SIN(RADIANS(21.04166030883789))
						 * SIN(RADIANS(address_latitude))))) FROM profiles WHERE users.id = profiles.id )`), 'distance'] ,
				[db.sequelize.literal('(SELECT COUNT(*) FROM book_users WHERE book_users.userId = users.id)'), 'BookCount'],
				[db.sequelize.literal('(SELECT COUNT(*) FROM reviews WHERE reviews.userId = users.id)'), 'ReviewCount']
			],
			include: [
				{
					model: Profile,
					where: Sequelize.where(
						Sequelize.fn("CONCAT",
						  Sequelize.col("first_name"),
						  " ",
						  Sequelize.col("last_name")
						),
						{
						  [Op.like]: '%' + q + '%' 
						}
					  )
                }
			]
    }).then(user => {
        res.send(user)
    }).catch(err => res.status(500).send({message: err}))
}
