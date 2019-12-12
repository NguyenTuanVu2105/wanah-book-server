const db = require('../config/db.config');
const User = db.user;
const Message = db.message;
const Op = db.Sequelize.Op;

exports.addMessage = (req, res) => {
    var Content = req.body.content;

    for (let i = 0; i < Content.length; i++) {
        Message.create({
            from: req.userId,
            to: req.body.to,
            content: Content[i].id
        }).then(() => {
            console.log("add message success")
        }).catch(err => {
            res.status(500).send({message: err});
            return;
        });
    }
    res.status(200).send({success: true});
}

exports.getMessage = (req, res) => {
    Message.findAll({
        where: {
            [Op.or]: [{from: req.userId}, {to: req.userId}]
        },
        attributes: ['content', 'message_time', 'from', 'to']
    }).then(message => {
        res.status(200).send(message);
    }).catch(err => res.status(500).send({message: err}));
}