const db = require('../config/db.config');
const User = db.user;
const Profile = db.profile;
const Category = db.category;
const Op = db.Sequelize.Op;
//sửa profile //complete
// exports.editProfile = (req, res) => {
//     Profile.update({
//         first_name: req.body.first_name,
//         last_name:  req.body.last_name,
//         description:  req.body.description
//     },{
//     where: { userId: req.userId }
//     }).then( () =>res.status(200).send({success : true})
//     ).catch(error =>
//         {
//             res.status(500).send({message: err})
//         })
// }

exports.editProfile = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        },
        include: [
            {model: Profile}
        ]
    }).then(user => {
    Profile.update({
        first_name: req.body.first_name,
        last_name:  req.body.last_name,
        description:  req.body.description,
        avatar: req.body.avatar
    },{
    where: { id: user.profile.id }
    }).then( () =>res.status(200).send({success : true})
    ).catch(error =>
        {
            res.status(500).send({message: err})
        })
    })
}

exports.Profile = (req, res) => {
    User.findOne({
        where: {
            id : req.userId
        }, 
        include: {
            model: Profile
        }
    }).then( user => {
        res.send(user.profile)
    }).catch(err => {
        res.status(500).send({message: err})
    })
}
