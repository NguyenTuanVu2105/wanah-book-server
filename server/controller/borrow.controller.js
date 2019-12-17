const db = require('../config/db.config');
const moment = require('moment');
const Request = db.request;
const BookUser = db.book_user;

// STATUS:  1: `Đợi Mượn`  
//          2: `Đã Mượn`

exports.convertHavedBorrow = (req, res) => {
    var dateNow = moment();
    var dateNumber = req.body.time_borrow;
    var dateReturn = moment().add(7*dateNumber, 'days').calendar();
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
                        book_user_id: req.body.book_user_id,
                        user_request_id: req.body.userId           
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
            user_request_id: req.userId,
            book_user_id: req.body.book_user_id
        }
    }).then(() => {
        Request.create({
            user_request_id: req.userId,
            book_user_id: req.body.book_user_id,
            is_accept: false,
            time_borrow: req.body.time_borrow
        }).then(() => {
            res.status(200).send({success: true});
        }).catch(err => res.status(500).send({success: false, message: err}));
    })
}

exports.isReturnBook = (req, res) => {
    BookUser.findOne({
        id: req.body.book_user_id,
        status: 'Đã Mượn'
    }).then(bookuser => {
        if (bookuser) {
            BookUser.update({
                status: 'Đợi Mượn'
            }, {
                id: req.body.book_user_id
            }).then(() => {
                Request.update({
                    is_exprired: true
                }, {
                    where: {
                        book_user_id: req.body.book_user_id,
                        user_request_id: req.body.userId
                    }
                }).then(() => {
                    res.status(200).send({success: true});
                }).catch(err => res.status(500).send({success: false, message: err}));
            }).catch(err => res.status(500).send({success: false, message: err}));
        }
    }).catch(err => res.status(500).send({success: false, message: err}));
}