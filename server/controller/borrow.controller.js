const db = require('../config/db.config');
const moment = require('moment');
const Request = db.request;
const BookUser = db.book_user;

// STATUS:  1: `Đợi Mượn`  
//          2: `Đã Mượn`

exports.convertHavedBorrow = (req, res) => {
    var dateNow = moment().format();
    var dateNumber = parseInt(req.body.time_borrow);
    var dateReturn = moment().add(7*dateNumber, 'days').format();
    BookUser.findOne({
        where: {
            id: req.body.book_user_id,
            status: 'Đợi Mượn'
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
                        userId: req.userId           
                    }
                }).then(() => {
                    res.status(200).send({success: true});
                }).catch(err => res.status(500).send({success: false, message: err}));
            }).catch(err => res.status(500).send({success: false, message: err}));
        }
    }).catch(err => res.status(500).send({success: false,message: err}))
}

exports.requestBorrowBook = (req, res) => {
    Request.findOne({
        where: {
            userId: req.userId,
            bookUserId: req.body.book_user_id
        }
    }).then(() => {
        Request.create({
            userId: req.userId,
            bookUserId: req.body.book_user_id,
            is_accept: false,
            time_borrow: req.body.time_borrow
        }).then(() => {
            res.status(200).send({success: true});
        }).catch(err => res.status(500).send({success: false, message: err}));
    })
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
                        userId: req.body.userId
                    }
                }).then(() => {
                    res.status(200).send({success: true});
                }).catch(err => res.status(500).send({success: false, message: err}));
            }).catch(err => res.status(500).send({success: false, message: err}));
        }
    }).catch(err => res.status(500).send({success: false, message: err}));
}