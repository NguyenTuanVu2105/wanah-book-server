const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
const Profile = db.profile;

const Op = db.Sequelize.Op;

exports.CreateUserProfile = (req, res) => {

    const profileFields = {};
    profileFields.userId = req.userId;
    if (req.body.first_name) profileFields.first_name = req.body.first_name;
    if (req.body.last_name) profileFields.last_name = req.body.last_name;
    if (req.body.description) profileFields.description = req.body.description;

    Profile.findOne({
        where: {id: req.userId}
    }).then(profile => {

        if (!profile) {
            new Profile(profileFields).save().then(profile => res.json(profile)).catch(err => console.log(err));
        } else {
            Profile.update({
                first_name: profileFields.first_name,
                last_name: profileFields.last_name,
                description: profileFields.description
            },{
                where: {
                    userId: {
                        [Op.eq]: req.userId
                    }
                }
            }).then(
                res.json(profile)
            ).catch(err => console.log(err));
        }
    }).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	});
}

exports.ViewUserProfile = (req, res) => {
    
}