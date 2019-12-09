const db = require('../config/db.config');
const config = require('../config/config');
const Book = db.book;
const Author = db.author;
const Category = db.category;
const Op = db.Sequelize.Op;
// thêm sách //complete
exports.addBookAdmin = (req, res) => {
    if (req.body.authorId && req.body.categoryId) {

        authorId = req.body.authorId;
        categoryId = req.body.categoryId;
        Book.findOne({
            where:{
                name: req.body.name
            }
        }).then(book => {
            if (!book) {
                Book.create({
                    name: req.body.name,
                    publisher: req.body.publisher,
                    description: req.body.description,
                    image: req.body.image,
                    star: req.body.star
                }).then(book => {
                    for (var i = 0; i < authorId.length; i++) {
                        console.log(authorId[i])
                        Author.findAll({
                            where: {
                                id: {
                                    [Op.or]: [authorId[i]]
                                }
                            }
                        }).then(auth => {
                            book.setAuthors(auth)
                            .then(() => console.log("Done Join With Table Author"))
                            .catch(err => console.log({message : err}));
                        })
                    }
                    for (var i = 0; i < categoryId.length; i++) {
                        Category.findAll({
                            where: {
                                id: {
                                    [Op.or]: [categoryId[i]]
                                }
                            }
                        }).then(cate => {
                            book.setCategories(cate)
                            .then(() => console.log("Done Join With Table Category"))
                            .catch(err => console.log({message : err}));
                        })
                    }

                    res.status(200).send({Success: true});

                }).catch(err => res.status(500).send({message : err}));
            } else {
                res.status(500).send({message : err});
            }
        }).catch(err => res.status(500).send({message : err}));
    }

}
//sửa thông tinh sách //complete
exports.editBookAdmin = (req,res) =>{
    Book.findOne({
        where:{id :req.body.id}
    }).then(book =>{
        if(!book)
            res.status(500).send({message : err})
        else 
        {
            Book.update({
                name: req.body.name,
                publisher: req.body.publisher,
                description: req.body.description,
                image :req.body.image,
                star : req.body.star
            },
            {
            where:{id :req.body.id}
            })
            .then(
                res.send({Success : true})
            ).catch(error =>
                {
                    res.status(500).send({message: err})
                })
        }
    })
}
//xóa sách admin//complete
exports.deleteBookAdmin = (req,res) =>{
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

// phân trang
exports.pagination = (req, res) => {
    console.log(req.query.limit)
    var limit = parseInt(req.query.limit)
    var page = parseInt(req.query.page)
    Book.findAndCountAll({
        limit: limit,
        offset: (page-1)*limit
        
    }).then( result => {
       
      res.status(200).send({
      success: true,
      data: result,
    });
    })
      
}
//xem thông tin sách theo sách
exports.listBook = (req, res) => {
    Book.findOne({
        where: { id: item.bookId },
        include: [
            {   model: author_book, 
                include:[{
                    model: author,
                }]
            },
            {   model: category_book, 
                include:[{
                    model: category,
                }]
            },
        ]
    }).then(books =>{
        res.status(200).send({success : true})
    }).catch(error =>
        {
            res.status(500).send({message: err})
        })
}
//xem thông tin sách theo thể loại
//xem thông tin sách theo tác giả


