const db = require('../config/db.config');
const config = require('../config/config');
const Book = db.book;
exports.addBookAdmin = (req, res) => {
    console.log(req.body.name)
    const bookcase = {};
    if (req.body.name) bookcase.name = req.body.name;
    if (req.body.publisher) bookcase.publisher = req.body.publisher;
    if (req.body.description) bookcase.description = req.body.description;
    if (req.body.image) bookcase.image = req.body.image;
    if (req.body.star) bookcase.star = req.body.star;
    Book.findOne({
        where:{name :req.body.name}
    }).then(book =>{
        if(!book)
        {
            new Book(bookcase).save()
            .then(book => res.status(200).send({success : true}))
            .catch(err => res.status(404).send({message: err}));
        }
        else res.status(404).send({message: err})
    }).catch(error =>
        {
            res.status(500).send({message: err})
        })

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


