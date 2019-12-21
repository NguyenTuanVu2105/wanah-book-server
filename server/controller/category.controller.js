const db = require('../config/db.config');
const Category = db.category;
const Book = db.book
//thêm thể loại//complete
exports.addCategory = (req, res) => {
    const category = {};
    if (req.body.name) category.name = req.body.name;
    Category.findOne({
        where:{name :req.body.name}
    }).then(cate =>{
        if(!cate) {
            new Category(category).save()
            .then(category => res.send({success : true, id: category.id}))
            .catch(err => res.status(404).send({message: err}));
        } else {
            res.send({success: false, message: "Category is exist"})
        }
    }).catch(err => res.status(500).send({message: err}))
}
//sửa thông tinh thể loại //complete
exports.editCategory = (req,res) =>{
    Category.findOne({
        where:{id :req.body.id}
    }).then(category =>{
        if(!category)
            res.status(500).send({message : err})
        else 
        {
        Category.update({
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
//xóa sách admin//complete
exports.deleteCategory = (req,res) =>{
    Category.destroy({
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
exports.searchCategoryByName = (req, res) => {
    var q = req.query.category
    Category.findAll(
        {
            attributes: [
                 'name',
            ],
            where: {name: {[db.Sequelize.Op.like]: '%' + q + '%'}},
            include: [
                {
                    model: Book,
                    attributes: ['id', 'name','image','star']
                    
                }
            ]
    }).then(books => {
        res.send(books)
    }).catch(err => res.status(500).send({message: err}))
}
exports.searchCategoryById = (req, res) => {
//    var q = req.query.category
console.log(req.query.id)
    Category.findAll(
        {
            attributes: [
                 'name',
            ],
            where: {id: req.query.id},
           
            include: [
                {
                    model: Book,
                    attributes: ['id', 'name','image','star']
                    
                }
            ]
    }).then(books => {
        res.send(books)
    }).catch(err => res.status(500).send({message: err}))
}
