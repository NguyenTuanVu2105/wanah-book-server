const db = require('../config/db.config');
const User = db.user;
const Message = db.message;
const Op = db.Sequelize.Op;
const Profile = db.profile;
exports.addMessage = (req, res) => {
    var Content = req.body.content;
    Message.create({
        fromId: req.userId,
        toId: req.body.to,
        content: Content
    }).then(() => {
        res.status(200).send({success: true});
    }).catch(err => {
        res.status(500).send({message: err});
        return;
    });
}

exports.getMessage = (req, res) => {
    Message.findAll({
        where: {
            [Op.or]: [
                {[Op.and]: [{fromId: req.userId}, {toId: req.query.id}]},
                {[Op.and]: [{fromId: req.query.id}, {toId: req.userId}]}
            ]
        },
        attributes: ['fromId', 'toId','content', 'message_time'],
    }).then(message => {
        res.status(200).send(message);
    }).catch(err => res.status(500).send({message: err}));
}

exports.getAllContact = (req, res) => {
    const getFrom = db.sequelize.query(`SELECT fromId FROM messages WHERE toId = ${req.userId} GROUP BY fromId;`, { type: db.sequelize.QueryTypes.SELECT})
    const getTo =  db.sequelize.query(`SELECT toId FROM messages WHERE fromId = ${req.userId} GROUP BY toId;`, { type: db.sequelize.QueryTypes.SELECT})
    Promise.all([getTo, getFrom])
    .then(result => {
        var users = [...new Set([...result[0].map(x => x.toId), ...result[1].map(x => x.fromId)])]
        User.findAll({
            where: {
                id: {
                    [Op.in]: users
                }
            } , 
            attributes: ['id'],
            include: [
                {
                    model: Profile
                }
            ]
        }).then(users => {
            res.send(users)
        })
    }).catch(err => res.status(500).send({message: err}));
}

