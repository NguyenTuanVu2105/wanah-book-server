const db = require('../config/db.config');
const Book = db.book;
const User = db.user;
const Author = db.author;
const BookUser = db.book_user;
const Category = db.category;
const Review = db.review;
const Profile = db.profile;
//thêm sách user // complete
exports.addBookUser = (req, res) => {
    Book.findOne({
        where: {
            id: req.body.id
        }
    }).then(books => {
        const bookcase = {};
        bookcase.userId = req.userId;
        bookcase.bookId = books.id;
        bookcase.status = "Đợi Mượn";
        BookUser.findOne({
            where:{
                bookId : books.id,
                userId : req.userId
            }
        }).then(bookId =>{
        if(!bookId)
        {
        new BookUser(bookcase).save()
            .then(book => res.send({id:bookcase.bookId,success : true}))
            .catch(err => res.status(404).send({message: err}));
        }
        else res.status(404).send({message: "Bạn đã sở hữu sách này"})
    })
    }).catch(err =>
        {
            res.status(500).send({message: err})
        })
}
//xóa sách user //complete
exports.deleteBookUser = (req,res) =>{
    BookUser.destroy({
        where: {
            bookId: req.body.bookId
        }
    }).then(function (result) {
        console.log(result)
        if(result !== 0)
        {
            res.status(200).send({ success: true })
        }
        else
        {
            res.status(404).json({message: "Sách không tồn tại"})
        }
    })
}

exports.listBook = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        },
        attributes: ['id'],
        include: [
            {
            model: Book,
            through: {
                attributes: []
            },
            include: [{
                model: Author,
                through: {
                    attributes: []
                }
            }]
        }
    ]
    }).then(bookUser => {
        res.status(200).send(bookUser);
    }).catch(err => res.status(500).send({message: err}));
}

exports.listBookOrderByReview = (req, res) => {
    var limit = parseInt(req.query.limit)
    var page = parseInt(req.query.page)
    Book.findAll(
        {
            limit: limit,
            offset: (page-1)*limit,
            attributes: [
                'id', 'name', 'image', 'star',
                [db.sequelize.literal('(SELECT COUNT(*) FROM reviews WHERE reviews.bookId = books.id)'), 'ReviewCount']
            ],
            include: [
            {
                model: Author,
                through: {
                    attributes: []
                }
            }
        ], 
        order: [[db.sequelize.literal('ReviewCount'), 'DESC']]
    }).then(books => {
        res.send(books)
    }).catch(err => res.status(500).send({message: err}))
}

exports.searchBook = (req, res) => {
    var q = req.query.q
    var limit = parseInt(req.query.limit)
    var page = parseInt(req.query.page)
    Book.findAll(
        {
            limit: limit,
            offset: (page-1)*limit,
            attributes: [
                'id', 'name', 'image', 'star',
            ],
            where: {name: {[db.Sequelize.Op.like]: '%' + q + '%'}},
            include: [
                {
                    model: Author,
                    through: {
                        attributes: ['bookId', 'authorId']
                    }
                }
            ]
    }).then(books => {
        res.send(books)
    }).catch(err => res.status(500).send({message: err}))
}

exports.infoBook = (req, res) => {
    Book.findOne(
        {
            // attributes: [
            //     'id', 'name', 'image', 'star',
            // ],
            where: {id : req.query.bookId},
            include: [
                {
                    model: Author,
                    through: {
                        attributes: ['bookId', 'authorId']
                    }
                },
                {
                    model: Category,
                    through: {
                        attributes: ['bookId', 'categoryId']
                    }
                }  
            ]
    }).then(books => {
        res.send(books)
    }).catch(err => res.status(500).send({message: err}))
}

exports.listUserByBook = (req, res) => {
    Book.findOne({
        where: {
            id: req.query.bookId
        },
        attributes: ['id'],
        include: [
            {
            model: User,
            attributes: ['id', [db.sequelize.literal(`(SELECT 111111 *
                DEGREES(ACOS(LEAST(1.0, COS(RADIANS(21.04166030883789))
                     * COS(RADIANS(address_latitude))
                     * COS(RADIANS(105.78498840332031 - address_longitude))
                     + SIN(RADIANS(21.04166030883789))
                     * SIN(RADIANS(address_latitude))))) FROM profiles WHERE users.id = profiles.id )`), 'distance'] 
            ],
            through: {
                attributes: [
                    'id', 'status',
                ],
                where: {
                    userId: {
                        [db.Sequelize.Op.ne]: [req.userId]
                    }
                }
            },
            include: [{
                model: Profile
            }]
        }
    ],
    order: [[db.sequelize.literal('`users.distance`'), 'ASC']],
    }).then(bookUser => {
        res.status(200).send(bookUser.users);
    }).catch(err => res.status(500).send({message: err}));
}
