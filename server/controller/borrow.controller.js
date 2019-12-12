const db = require('../config/db.config');
const Request = db.request;
const User = db.user;
const Book = db.book;
const BookUser = db.book_user;

exports.notificationStatus = (req, res) => {

}

exports.convertHavedBorrow = (req, res) => {

}

exports.requestBorrowBook = (req, res) => {
    BookUser.findOne({
        where: {
            bookId: req.body.bookId,
            userId: req.userId
        }
    }).then(bookuser => {
        if (!bookuser) {
            BookUser.create({
                bookId: req.body.bookId,
                userId: req.userId
            }).then(() => {
                console.log("Create New Book User!");
            }).catch(err => {
                res.status(500).send({message: err});
            })
        } else {
            console.log("Book User is exist");
        }
    }).catch(err => res.status(500).send({message: err}));

    BookUser.findOne({
        where: {
            bookId: req.body.bookId,
            userId: req.userId
        }
    }).then(bookuser => {
        if (!bookuser) {
            
        }
    }).catch(err => res.status(500).send({message: err}));
}

exports.notificationRequestBorrow = (req, res) => {
    
}