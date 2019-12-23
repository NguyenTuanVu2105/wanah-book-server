const db = require('../config/db.config');
const Author = db.author;
const Book = db.book
//thêm tác giả// complete
exports.addAuthor = (req, res) => {
    const authors = {};
    if (req.body.name) authors.name = req.body.name;
    Author.findOne({
        where:{name :req.body.name}
    }).then(author =>{
        if(!author)
        {
            new Author(authors).save()
            .then(author => res.send({success : true, id: author.id}))
            .catch(err => res.status(404).send({message: err}));
        }
        else res.status(500).send({message: err})
    })
}
//sửa thông tin tác giả //complete
exports.editAuthor = (req,res) =>{
    Author.findOne({
        where:{id :req.body.id}
    }).then(author =>{
        if(!author)
            res.status(500).send({message : err})
        else 
        {
        Author.update({
                name: req.body.name,
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
//xóa tác giả//complete
exports.deleteAuthor = (req,res) =>{
    Author.destroy({
        where: {
            id: req.body.id
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
exports.searchAuthorByName = (req, res) => {
    var q = req.query.q
    var limit = parseInt(req.query.limit)
    var page = parseInt(req.query.page)
    Author.findAll(
        {
            limit: limit,
            offset: (page-1)*limit,
            attributes: [
                 'id','name',
            ],
            where: {name: {[db.Sequelize.Op.like]: '%' + q + '%'}},
            through: {
                attributes: []
            },
            include: [
                {
                    model: Book,
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
                }
            ]
    }).then(result => {
        res.send(result)
    }).catch(err => res.status(500).send({message: err}))
}
exports.searchAuthorById = (req, res) => {
   // var q = req.query.author
   var limit = parseInt(req.query.limit)
   var page = parseInt(req.query.page)
   Book.findAll({
        limit: limit,
        offset: (page-1)*limit,
        attributes: [
            'id', 'name', 'image', 'star',
            [db.sequelize.literal('(SELECT COUNT(*) FROM reviews WHERE reviews.bookId = books.id)'), 'ReviewCount']
        ],
        include: [
        {
            model: Author,
            where: {
                id: req.query.id
            },
            through: {
                attributes: []
            }
        }]
   })
    .then(result => {
        res.send(result)
    }).catch(err => res.status(500).send({message: err}))
}
