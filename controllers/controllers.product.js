const Product = require('../models/models.product');

exports.getProdPage = (req, res, next) => {
     res.render('../views/product/add-products',{title:"Add-Products"});

};
exports.saveProduct = (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    });
    product.save()
        .then((result) => {
            res.redirect('/savePrd');
        })
        .catch(err => console.log(err));
};