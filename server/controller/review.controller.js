const db = require('../config/db.config');
const User = db.user;
const Book = db.book;
const Review = db.review;
const Vote = db.vote;
const Profile = db.profile;

exports.addReview = (req, res) => {
    Review.create({
        content: req.body.content,
        star: req.body.star,
        userId: req.userId,
        bookId: req.body.bookId
    }).then(review => {
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
    limit = parseInt(req.query.limit)
    page = parseInt(req.query.page)
    Review.findAll({
        limit: limit,
        offset: (page-1)*limit,
        attributes: [
            'id', 'content', 'star',
            [db.sequelize.literal('(SELECT count(if(is_upvote = 1, 1, null)) - count(if(is_upvote = 0, 1, null)) FROM votes WHERE votes.reviewId = reviews.id)'), 'VoteCount'],
            [db.sequelize.literal(`(SELECT is_upvote FROM votes WHERE votes.reviewId = reviews.id AND votes.userId = ${req.userId})`), 'voted']
        ],
        include: [{
            model: User,
            attributes: ['id'],
            include: [{
                model: Profile,
                attributes: ['first_name', 'last_name', 'avatar']
            }]
        },
        {
            model: Book
        }
    ],
        order: [[db.sequelize.literal('VoteCount'), 'DESC']]
    }).then(reviews => {
        res.send(reviews)
    })
    .catch(err => res.status(500).send({message: err}))
}

exports.reviewByBook = (req, res) => {
    limit = parseInt(req.query.limit)
    page = parseInt(req.query.page)
    Book.findOne({
        where: {
            id: req.query.bookId
        },
        attributes: ['id', 'name', 'publisher', 'description', 'star'],
        include:[{
            model: Review,
            limit: limit,
            offset: (page-1)*limit,
            attributes: [
                'id', 'content', 'star',
                [db.sequelize.literal('(SELECT count(if(is_upvote = 1, 1, null)) - count(if(is_upvote = 0, 1, null)) FROM votes WHERE votes.reviewId = reviews.id)'), 'VoteCount'],
                [db.sequelize.literal(`(SELECT is_upvote FROM votes WHERE votes.reviewId = reviews.id AND votes.userId = ${req.userId})`), 'voted']
            ],
            include: [{
                model: User,
                attributes: ['id'],
                include: [{
                    model: Profile,
                    attributes: ['first_name', 'last_name', 'avatar']
                }]
            }
        ],
        }]
    }).then(book => {
        res.send(book.reviews)
    }).catch(err => res.status(500).send({message: err}));
}

exports.reviewByUser = (req, res) => {
    limit = parseInt(req.query.limit)
    page = parseInt(req.query.page)
    User.findOne({
        where: {
            id: req.query.userId
        },
        attributes: ['id', 'email'],
        include:[{
            model: Review,
            limit: limit,
            offset: (page-1)*limit,
            attributes: [
                'id', 'content', 'star',
                [db.sequelize.literal('(SELECT count(if(is_upvote = 1, 1, null)) - count(if(is_upvote = 0, 1, null)) FROM votes WHERE votes.reviewId = reviews.id)'), 'VoteCount'],
                [db.sequelize.literal(`(SELECT is_upvote FROM votes WHERE votes.reviewId = reviews.id AND votes.userId = ${req.userId})`), 'voted']
            ],
            include: [
            {
                model: Book
            }
        ],
        }]
    }).then(userReview => {
        res.status(200).send(userReview);
    }).catch(err => res.status(500).send({message: err}));
}


exports.getbyNewReview = (req, res) => {
    limit = parseInt(req.query.limit)
    page = parseInt(req.query.page)
    Review.findAll({
        limit: limit,
        offset: (page-1)*limit,
        attributes: [
            'id', 'content', 'star', 'userId', 'bookId',
            [db.sequelize.literal('(SELECT count(if(is_upvote = 1, 1, null)) - count(if(is_upvote = 0, 1, null)) FROM votes WHERE votes.reviewId = reviews.id)'), 'VoteCount'],
            [db.sequelize.literal(`(SELECT is_upvote FROM votes WHERE votes.reviewId = reviews.id AND votes.userId = ${req.userId})`), 'voted']
        ],
        include: [{
            model: User,
            attributes: ['id'],
            include: [{
                model: Profile,
                attributes: ['first_name', 'last_name', 'avatar']
            }]
        },
        {
            model: Book
        }
    ],
        order: [['updatedAt', 'DESC']]
    }).then(reviews => {
        res.send(reviews)
    })
    .catch(err => res.status(500).send({message: err}))
}