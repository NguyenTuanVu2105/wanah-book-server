const db = require('../config/db.config');
const config = require('../config/config');
const Book = db.book;
const BookUser= db.book_user;

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
    // var page = parseInt(req.query.page)
    // BookUser.findAll({
    //     where: {
    //       userId: req.userId
    //     }
    // }).then(books =>{
    //     books = books.filter(item=>item.bookId).map(item=>{
    //         return Book.findOne({
    //             where: { id: item.bookId },
    //             include: [
    //                 {   model: author_book, 
                        
    //                     include:[{
    //                         model: author,
    //                     }]
    //                 }]
    //         })
    //     })
    //     Promise.all(books).then(result=>{
    //         res.send(result.map(item=>{
    //             return {
    //                 id :  item.id,
    //                 name: item.name,
    //                 star  :item.star,
    //             }
    //         }))
    //     })
    // })




    // Book.findAndCountAll({
    //     limit: 10,
    //     offset: (page-1)*limit
        
    // }).then( result => {
       
    //   res.status(200).send({
    //   success: true,
    //   data: result,
    // });
    // })
    BookUser.findAll({
        where: {
          userId: req.userId
        }
    }).then(books =>{
        db.sequelize.query("select name,star,author from book_detail")
        .then(book => {
            console.log(book)
        })
    })
}