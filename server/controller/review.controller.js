const db = require('../config/db.config');
const User = db.user;
const Book = db.book;
const Review = db.review;
const Vote = db.vote;

exports.addReview = (req, res) => {
    Review.create({
        content: req.body.content,
        star: req.body.star,
        userId: req.userId,
        bookId: req.body.bookId
    }).then(review => {
        Vote.create({
            userId: req.userId,
            reviewId: review.id,
            is_upvote: 0
        })
        res.status(200).send({success: true});
    }).catch(err => res.status(500).send(err.message));

    // db.sequelize.query('CREATE TRIGGER review_trg ON reviews FOR EACH ROW' +
    // ' BEGIN' +
    // ' update books set star = 3 where id = 1;' +
    // 'END;')
}

exports.addVote = (req, res) => {
    Vote.findOne({
        where: {
            userId: req.userId,
            reviewId: req.body.reviewId
        }
    }).then(vote => {
        if (!vote) {
            Vote.create({
                userId: req.userId,
                reviewId: req.body.reviewId,
                is_upvote: req.body.is_upvote
            }).then(() => {
                res.status(200).send({success: true})
            }).catch(err => res.status(500).send({success: false}));
        } else {
            Vote.update({
                is_upvote: req.body.is_upvote
            }, {
                where: {
                    userId: req.userId,
                    reviewId: req.body.reviewId
                }
            }).then(() => {
                res.status(200).send({message: "update vote is success!", success: true});
            }).catch(err => res.status(500).send({message: err}))
        }
    }).catch(err => res.status(500).send({message: err}));
}

exports.goodReview = (req, res) => {
    Book.findOne({
        where: {
            id: req.query.bookId
        },
        attributes: ['id', 'name', 'publisher', 'description', 'star'],
        include: [{
            model: Review,
            attributes: ['id', 'content', 'star', 'bookId'],
            include: [{
                model: Vote,
                attributes: ['reviewId',[db.sequelize.fn('COUNT', db.sequelize.col('is_upvote')), 'count']],
                group: ['books.id'],
                order: [
                    ['count', "DESC"]
                ]
            }]
        }]
    }).then(AllInfor => {
        res.status(200).send(AllInfor);
    }).catch(err => res.status(500).send({message: err}))
}

exports.reviewByBook = (req, res) => {
    var arrResult = [];
    Book.findOne({
        where: {
            id: req.query.id
        },
        attributes: ['id', 'name', 'publisher', 'description', 'star'],
        include: [{
            model: Review,
            attributes: ['id', 'content', 'star', 'bookId'],
            include: [{
                model: Vote,
                attributes: ['id', 'is_upvote', 'userId', 'reviewId']
            }],
        }],
    }).then(AllInfor => {
        for (var i = 0 ; i < AllInfor.reviews.length; i++) {
            let data = {};
            if (AllInfor.reviews[i].votes.length > 0) {
                data.reviewId = AllInfor.reviews[i].id;
                data.count = 0;
                for (let j = 0 ; j < AllInfor.reviews[i].votes.length ; j++) {
                    if (AllInfor.reviews[i].votes[j].is_upvote) {
                        data.count++;
                    }
                }
            } else {
                data.reviewId = AllInfor.reviews[i].id;
                data.count = 0;
            }
            arrResult.push(data);
        }

        res.status(200).send({bookInfor: AllInfor, countInfor :arrResult});
    }).catch(err => res.status(500).send({message: err}))
}

exports.reviewByUser = (req, res) => {
    var arrResult = [];
    User.findOne({
        where: {
            id: req.query.id
        },
        attributes: ['id', 'email']
        ,
        include: [{
            model: Review,
            attributes: ['id', 'content', 'star', 'bookId'],
            include: [{
                model: Vote,
                attributes: ['id', 'is_upvote', 'userId', 'reviewId']
            }]
        }]
    }).then(AllInfor => {
        for (var i = 0 ; i < AllInfor.reviews.length; i++) {
            let data = {};
            if (AllInfor.reviews[i].votes.length > 0) {
                data.reviewId = AllInfor.reviews[i].id;
                data.count = 0;
                for (let j = 0 ; j < AllInfor.reviews[i].votes.length ; j++) {
                    if (AllInfor.reviews[i].votes[j].is_upvote) {
                        data.count++;
                    }
                }
            } else {
                data.reviewId = AllInfor.reviews[i].id;
                data.count = 0;
            }
            arrResult.push(data);
        }

        res.status(200).send({userInfor: AllInfor, countInfor :arrResult});
    }).catch(err => res.status(500).send({message: err}))
}

exports.getbyNewReview = (req, res) => {
    Book.findOne({
        where: {
            id: req.query.bookId
        },
        attributes: ['id', 'name', 'publisher', 'description', 'star'],
        include: [{
            model: Review,
            attributes: ['id', 'content', 'star', 'bookId'],
            include: [{
                model: Vote,
                attributes: ['reviewId',[db.sequelize.fn('COUNT', db.sequelize.col('is_upvote')), 'count']],
                group: ['books.id'],
                order: [
                    ['reviews.createdAt', "DESC"]
                ]
            }]
        }]
    }).then(AllInfor => {
        res.status(200).send(AllInfor);
    }).catch(err => res.status(500).send({message: err}))
}

exports.reviewByPagination = (req, res) => {
    console.log(req.query.limit)
    var limit = parseInt(req.query.limit)
    var page = parseInt(req.query.page)
    console.log(limit)
    console.log(page)
    Book.findAll({
        limit: limit,
        offset: (page-1)*limit
    }, {
        where: {
            id: req.body.bookId
        },
        attributes: ['id', 'name', 'publisher', 'description', 'star'],
        include: [{
            model: Review,
            attributes: ['id', 'content', 'star', 'bookId'],
            include: [{
                model: Vote,
                attributes: ['reviewId',[db.sequelize.fn('COUNT', db.sequelize.col('is_upvote')), 'count']],
                group: ['books.id']
            }]
        }] 
    }).then( result => {
        res.status(200).send({
            success: true,
            data: result,
            next: '/api/own/reviews/list?limit=5&page=3',
            prev: '/api/own/reviews/list?limit=5&page=3'
        })
    }).catch(err => res.status(500).send({message: err}))
}