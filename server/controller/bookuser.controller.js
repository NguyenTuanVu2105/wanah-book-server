const db = require('../config/db.config');
const Book = db.book;
const User = db.user;
const Author = db.author;

//thêm sách user // complete
exports.addBookUser = (req, res) => {
    Book.findOne({
        where: {
            id: req.body.id
        }
    }).then(books => {
        console.log(books.id)
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
        else res.status(404).send({message: err})
    })
    }).catch(error =>
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
                    attributes: ['bookid', 'authorId']
                }
            }]
        }]
    }).then(bookUser => {
        res.status(200).send(bookUser);
    }).catch(err => res.status(500).send({message: err}));
}