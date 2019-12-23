const db = require('../config/db.config');
const moment = require('moment');
const Request = db.request;
const BookUser = db.book_user;
const Book = db.book;
const User = db.user;
const Profile = db.profile;
const Author = db.author;
const Op = db.Sequelize.Op;
const Reviews = db.Reviews;
// STATUS:  1: `Đợi Mượn`  
//          2: `Đã Mượn`
//          3: `Liên lạc`

exports.convertHavedBorrow = (req, res) => {
    var dateNow = moment().format();
    var dateNumber = parseInt(req.body.time_borrow);
    var dateReturn = moment().add(7*dateNumber, 'days').format();
    BookUser.findOne({
        where: {
            id: req.body.book_user_id,
        }
    }).then(bookuser => {
        if (bookuser) {
            BookUser.update({
                status: 'Đã Mượn'
            }, {
                where: {
                    id: req.body.book_user_id
                }
            }).then(() => {
                Request.update({
                    request_date: dateNow,
                    return_date: dateReturn,
                    is_accept: true,
                    is_exprired: false
                }, {
                    where: {
                        bookUserId: req.body.book_user_id,
                        // userId: req.userId           
                    }
                }).then(() => {
                    res.status(200).send({success: true, request_date: dateNow, return_date: dateReturn});
                }).catch(err => res.status(500).send({success: false, message: err}));
            }).catch(err => res.status(500).send({success: false, message: err}));
        }
    }).catch(err => res.status(500).send({success: false,message: err}))
}

exports.acceptRequest = (req, res) => {
    Request.findOne({
        where: {
            id: req.body.request_id,
        }
    }).then(request => {
        if (request) {
            BookUser.update({
                status: 'Liên lạc'
            }, {
                where: {
                    id: request.bookUserId
                }
            }).then(() => {
                Request.update({
                    is_accept: true
                }, {
                    where: {
                        id: request.id
                    }
                })
                .then(() => res.status(200).send({success: true}))
                .catch(err => res.status(500).send({success: false, message: err}))
            }).catch(err => res.status(500).send({success: false, message: err}));
        } else {
            res.status(404).send({message: 'Not found'})
        }
    }).catch(err => res.status(500).send({success: false,message: err}))
}

exports.denyRequest = (req, res) => {
    Request.findOne({
        where: {
            id: req.body.request_id,
        }
    }).then(request => {
        if (request) {
            Request.destroy({
                where: {
                    id: request.id,
                }
            }).then(() => {
                res.status(200).send({success: true});
            }).catch(err => res.status(500).send({success: false, message: err}));
        } else {
            res.status(404).send({message: 'Not found'})
        }
    }).catch(err => res.status(500).send({success: false,message: err}))
}

exports.requestBorrowBook = (req, res) => {
    Request.findOne({
        where: {
            userId: req.userId,
            bookUserId: req.body.book_user_id
        }
    }).then(request => {
        if (!request) {
            Request.create({
                userId: req.userId,
                bookUserId: req.body.book_user_id,
                is_accept: false,
                time_borrow: req.body.time_borrow
            }).then(() => {
                res.status(200).send({success: true});
            }).catch(err => res.status(500).send({success: false, message: err}));
        } else {
            res.status(200).send({success: false, message: "Bạn đã yêu cầu mượn sách này!"});
        }
    }).catch(err => res.status(500).send({message: err}));
}

exports.isReturnBook = (req, res) => {
    BookUser.findOne({
        where: {
            id: req.body.book_user_id,
            status: 'Đã Mượn'
        }
    }).then(bookuser => {
        if (bookuser) {
            BookUser.update({
                status: 'Đợi Mượn'
            }, {
                where: {
                    id: req.body.book_user_id
                }
            }).then(() => {
                Request.update({
                    is_exprired: true
                }, {
                    where: {
                        bookUserId: req.body.book_user_id,
                        // userId: req.body.userId
                    }
                }).then(() => {
                    res.status(200).send({success: true});
                }).catch(err => res.status(500).send({success: false, message: err}));
            }).catch(err => res.status(500).send({success: false, message: err}));
        }
    }).catch(err => res.status(500).send({success: false, message: err}));
}

exports.getRequestsIncoming = (req, res) => {
    var userId = req.userId
    Request.findAll({
        where: {
            [Op.or]: [
                {userId: userId},
                db.sequelize.literal(`book_user.userId = ${userId}`)
            ]
        },
        include: [{
            model: BookUser, 
            attributes: ['id', 'status'],
            include: [
                {
                    model: Book, 
                    attributes: ['id', 'name', 'image'],
                    include: [{
                        model: Author,
                        attributes: ['name']
                    }]
                },
                {
                    model: User,
                    attributes: ['id'],
                    include: [{
                        model: Profile,
                        attributes: ['first_name', 'last_name', 'avatar', 'address_detail']
                    }]
                }
            ]
        },
        {
            model: User,
            attributes: ['id'],
            include: [{
                model: Profile,
                attributes: ['first_name', 'last_name', 'avatar', 'address_detail']
            }]
        } 
    ] 
    }
    ).then(result => res.send(result))
    .catch(err => res.status(500).send({message: err}))
}

exports.getRequestDetail = (req, res) => {
    var userId = req.userId
    Request.findOne({
        where: {
            [Op.or]: [
                {userId: userId},
                db.sequelize.literal(`book_user.userId = ${userId}`)
            ],
            id: req.query.request_id
        },
        include: [{
            model: BookUser, 
            attributes: ['id', 'status'],
            include: [
                {
                    model: Book, 
                    attributes: ['id', 'name', 'image', 'star'],
                    include: [{
                        model: Author,
                        attributes: ['name']
                    }]
                },
                {
                    model: User,
                    attributes: [
                        'id'
                    ],
                    include: [{
                        model: Profile,
                        attributes: ['first_name', 'last_name', 'avatar', 'address_detail']
                    }, 
                    {
                        model: Book,
                        attributes: ['id'],
                        through: {
                            attributes: []
                        }
                    }, 
                    {
                        model: db.review,
                        attributes: ['id']
                    }
                ]
                }
            ]
        },
        {
            model: User,
            attributes: ['id'
        ],
            include: [{
                model: Profile,
                attributes: ['first_name', 'last_name', 'avatar', 'address_detail']
            },
            {
                model: Book,
                attributes: ['id'],
                through: {
                    attributes: []
                }
            }, 
            {
                model: db.review,
                attributes: ['id']
            }
        ]
        } 
    ] 
    }
    ).then(result => {
        if (result){
            res.send(result)
        } else {
            res.status(404).send({message: 'Not Found'})
        }
        
    })
    .catch(err => res.status(500).send({message: err}))
}