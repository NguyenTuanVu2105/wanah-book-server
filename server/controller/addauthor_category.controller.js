const db = require('../config/db.config');
const Author = db.author;
const Category = db.category;
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
            .then(author => res.send({success : true}))
            .catch(err => res.status(404).send({message: err}));
        }
        else res.status(500).send({message: err})
    })
}
//thêm thể loại//complete
exports.addCategory = (req, res) => {
    const category = {};
    if (req.body.name) category.name = req.body.name;
    Category.findOne({
        where:{name :req.body.name}
    }).then(author =>{
        if(!author)
        {
            new Category(category).save()
            .then(category => res.send({success : true}))
            .catch(err => res.status(404).send({message: err}));
        }
        else res.status(500).send({message: err})
    })
}