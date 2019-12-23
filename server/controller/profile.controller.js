const db = require('../config/db.config');
const User = db.user;
const Profile = db.profile;
const fs = require('fs')

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
    },{
    where: { id: user.profile.id }
    }).then( () =>res.status(200).send({success : true})
    ).catch(err =>
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

exports.uploadAvatar = (req, res) => {
    const processedFile = req.file || {}
    let orgName = processedFile.originalname || ''
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path
    const newFullPath = `${fullPathInServ}-${orgName}`
    fs.renameSync(fullPathInServ, newFullPath);
    const temp = newFullPath.split('/')
    const fileName = temp[temp.length-1]

    User.findOne({
        where: {
            id: req.userId
        },
        include: [
            {model: Profile}
        ]
    }).then(user => {
    Profile.update({
        avatar: fileName
    },{
    where: { id: user.profile.id }
    }).then( () =>res.status(200).send({success : true})
    ).catch(err =>
        {
            res.status(500).send({message: err})
        })
    })
}