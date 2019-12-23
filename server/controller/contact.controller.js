const db = require('../config/db.config');
const Profile = db.profile;
const User = db.user;
const Book = db.book;
const Review = db.review;
const Op = db.Sequelize.Op;
const Author = db.author;

exports.contactUser = (req, res) => {
    var limit = parseInt(req.query.limit)
    var page = parseInt(req.query.page)
    User.findAll({
        where: {
            id: {
                [Op.ne]: [req.userId]
            }
        }, 
        limit: limit,
        offset: (page-1)*limit,
        attributes: [
            'id',
            [db.sequelize.literal(`(SELECT 111111 *
            DEGREES(ACOS(LEAST(1.0, COS(RADIANS(21.04166030883789))
                 * COS(RADIANS(address_latitude))
                 * COS(RADIANS(105.78498840332031 - address_longitude))
                 + SIN(RADIANS(21.04166030883789))
                 * SIN(RADIANS(address_latitude))))) FROM profiles WHERE users.id = profiles.id )`), 'distance'] ,
            [db.sequelize.literal('(SELECT COUNT(*) FROM book_users WHERE book_users.userId = users.id)'), 'BookCount'],
            [db.sequelize.literal('(SELECT COUNT(*) FROM reviews WHERE reviews.userId = users.id)'), 'ReviewCount']
        ],
        include: [
            {
                model: Profile, 
                attributes: [
                    'first_name', 'last_name', 'address_detail', 'description', 'avatar'
                ], 
            },
        ],
        order: [[db.sequelize.literal('distance'), 'ASC']]
    }).then(users => res.send(users))
    .catch(err => res.status(500).send({message: err}));
}

exports.userDetail = (req, res) => {
    var userId = req.query.userId
    User.findOne({
        where: {
            id: userId
        },
        attributes: [
            'id',
         ],
        include: [
            {
                model: Profile
            }, 
            {
                model: Book,
                include: [{
                    model: Author
                }]
            },
            {
                model: Review,
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
            }
        ]
    }).then(result => res.send(result))
}