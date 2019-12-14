const db = require('../config/db.config');
const User = db.user;
const Profile = db.profile;
const Category = db.category;
const Op = db.Sequelize.Op;
//sửa profile //complete
exports.editProfile = (req, res) => {
    Profile.update({
        first_name: req.body.first_name,
        last_name:  req.body.last_name,
        description:  req.body.description
    },{
    where: { userId: req.userId }
    }).then( () =>res.status(200).send({success : true})
    ).catch(error =>
        {
            res.status(500).send({message: err})
        })
}
exports.Profile = (req, res) => {
    Profile.findOne({
        where: {
            id : req.userId
        }
    }).then( profile => {
        if(profile) {
            Category.findAll({
                include: {
                    model: Profile,
                    through: {
                        attributes: ['name'],
                        where: {profileId: profile.id}
                    }
                }
            }).then( category => {
                res.status(200).send({
                    first_name : profile.first_name,
                    last_name  : profile.last_name,
                    description: profile.description,
                    address_detail: profile.address_detail,
                    category: category.map(x => {
                        return {
                            id: x.id,
                            name: x.name
                        }
                    })
                 })
            }).catch(err => {
                res.status(500).send({message: err})
            })
        }
    }).catch(err => {
        res.status(500).send({message: err})
    })
}
