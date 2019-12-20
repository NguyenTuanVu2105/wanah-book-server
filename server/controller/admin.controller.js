const db = require('../config/db.config');
const User = db.user;
const Profile = db.profile;
const Category = db.category;
const Book = db.book;
const Review = db.review;

exports.viewAllUser = (req, res) => {
    limit = parseInt(req.query.limit);
    page = parseInt(req.query.page);
    Profile.findAll({
        limit: limit,
        offset: (page-1)*limit,
        include: [{
            model: Category
        }]
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => res.status(500).send({message: err}));
}

exports.viewAllBook = (req, res) => {
    limit = parseInt(req.query.limit);
    page = parseInt(req.query.page);
    Book.findAll({
        limit: limit,
        offset: (page-1)*limit,
    }).then(allBook => {
        res.status(200).send(allBook);
    }).catch(err => res.status(500).send({message: err}));
}

exports.viewAllReview = (req, res) => {
    limit = parseInt(req.query.limit);
    page = parseInt(req.query.page);
    Review.findAll({
        limit: limit,
        offset: (page-1)*limit,
    }).then(allReview => {
        res.status(200).send(allReview);
    }).catch(err => res.status(500).send({message: err}));
}

exports.totalInformationDetail = (req, res) => {
    var inforDetail = {};
    
    Promise.all([User.count(), Book.count(), Review.count()]).then(value => {
        console.log(value);
        res.status(200).send({totalUser: value[0], totalBook: value[1], totalReview: value[2]});
    }).catch(err => res.status(500).send({message: err}));
}