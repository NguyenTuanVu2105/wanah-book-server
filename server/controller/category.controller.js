const db = require('../config/db.config');
const Author = db.author;
const Category = db.category;
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