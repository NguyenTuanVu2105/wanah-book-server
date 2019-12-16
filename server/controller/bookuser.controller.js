const db = require('../config/db.config');
const Book = db.book;
const User = db.user;
const Author = db.author;
const BookUser = db.book_user;
const Category = db.category;
const Review = db.review;
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
        BookUser.findOne({
            where:{bookId : books.id}
        }).then(bookId =>{
        if(!bookId)
        {
        new BookUser(bookcase).save()
            .then(book => res.send({id:bookcase.bookId,success : true}))
            .catch(err => res.status(404).send({message: err}));
        }
        else res.status(404).send({message: "User owned this book"})
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
            res.status(404).json({message: err})
        }
    })
}

exports.listBook = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        },
        include: [{
            model: Book,
            through: {
                attributes: ['userId', 'bookId']
            },
            include: [{
                model: Author,
                through: {
                    attributes: ['bookId', 'authorId']
                }
            }]
        }]
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
                    attributes: ['bookId', 'authorId']
                }
            }
        ], 
        order: [[db.sequelize.literal('ReviewCount'), 'DESC']]
    }).then(books => {
        res.send(books)
    })
}

exports.searchBook = (req, res) => {
    var limit = parseInt(req.query.limit)
    var q = req.query.q
    Book.findAll(
        {
            limit: limit,
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
    })
}
exports.infoBook = (req, res) => {
    Book.findAll(
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
    })
}
