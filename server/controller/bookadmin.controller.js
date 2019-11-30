const db = require('../config/db.config');
const config = require('../config/config');
const Book = db.book;
exports.addBookAdmin = (req, res) => {
    console.log(req.body.name)
    const bookcase = {};
    if (req.body.name) bookcase.name = req.body.name;
    if (req.body.publisher) bookcase.publisher = req.body.publisher;
    if (req.body.description) bookcase.description = req.body.description;
    if (req.body.author) bookcase.author = req.body.author;
    if (req.body.image) bookcase.image = req.body.image;
    if (req.body.star) bookcase.star = req.body.star;
    Book.findOne({
        where:{name :req.body.name}
    }).then(book =>{
        if(!book)
        {
            new Book(bookcase).save()
            .then(book => res.send({Success : true}))
            .catch(err => console.log(err));
        }
        else res.status(500).send({Success : false},'Error -> ' + err)
    })
}
exports.editBookAdmin = (req,res) =>{
    Book.findOne({
        where:{name :req.body.name}
    }).then(book =>{
        if(!book)
            res.status(500).send({Success : false},'Error -> ' + err)
        else 
        {
            Book.update({
                publisher: req.body.publisher,
                description: req.body.description,
                author: req.body.author,
                image :req.body.image,
                star : req.body.star
            },
            {
            where:{name :req.body.name}
            })
            .then(
                res.send({Success : true})
            ).catch(err => console.log(err));
        }
    })
}
exports.deleteBookAdmin = (req,res) =>{
    Book.destroy({
        where: {
          name: req.body.name
        }
    }).then(book =>{
        res.send({Success: true})
    }).catch(res.status(500).send({Success : false},'Error -> ' + err))
}
exports.pagination = (req, res) => {
    console.log(req.query.limit)
    var limit = parseInt(req.query.limit)
    var page = parseInt(req.query.page)
    console.log(limit)
    console.log(page)
    Book.findAndCountAll({
        limit: limit,
        offset: (page-1)*limit
        
    }).then( result => {
       
      res.status(200).send({
      success: true,
      data: result,
      next: '/api/admin/books/list?limit=5&page=3',
      prev: '/api/admin/books/list?limit=5&page=3'
    });
    })
      
}