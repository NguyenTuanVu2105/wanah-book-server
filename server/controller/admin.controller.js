const db = require('../config/db.config');
const multer = require('multer');
const fs = require('fs');

const User = db.user;
const Profile = db.profile;
const Book = db.book;
const Review = db.review;
const Category = db.category;
const Author = db.author;

exports.viewAllUser = (req, res) => {
    limit = parseInt(req.query.limit);
    page = parseInt(req.query.page);
    User.findAll({
        limit: limit,
        offset: (page-1)*limit,
        include: [{
            model: Profile
        }]
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => res.status(500).send({message: err}));
}

exports.getCategory = (req, res) => {
    limit = parseInt(req.query.limit);
    page = parseInt(req.query.page);
    Category.findAll({
        limit: limit,
        offset: (page-1)*limit
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => res.status(500).send({message: err}));
}

exports.category = (req, res) => {
    Category.findAll({
        where: {name: {[db.Sequelize.Op.like]: '%' + req.query.q + '%'}}
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => res.status(500).send({message: err}));
}

exports.author = (req, res) => {
    Author.findAll({
        where: {name: {[db.Sequelize.Op.like]: '%' + req.query.q + '%'}}
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => res.status(500).send({message: err}));
}

exports.getAuthor = (req, res) => {
    limit = parseInt(req.query.limit);
    page = parseInt(req.query.page);
    Author.findAll({
        limit: limit,
        offset: (page-1)*limit
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

exports.uploadBook = (req, res) => {
    const processedFile = req.file || {}
    let orgName = processedFile.originalname || ''
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path
    const newFullPath = `${fullPathInServ}-${orgName}`
    fs.renameSync(fullPathInServ, newFullPath);
    const temp = newFullPath.split('\\')
    const fileName = temp[temp.length-1]
    res.send({fileName, test: req.body.test})    
}
