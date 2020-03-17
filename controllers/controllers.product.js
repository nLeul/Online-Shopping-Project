const Product = require('../models/models.product');
const ProductService = require('../service/service.product');

exports.getProdPage = (req, res, next) => {
    res.render('../views/product/add-products', { title: "Add-Products" });

};
exports.saveProduct = (req, res, next) => {

    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: ProductService.convertToBase64(req.body.image),
        description: req.body.description
    });
    //console.log(product);
    product.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.getHomePage = (req, res, next) => {
    Product.find()
        .then(result => {
            let prds = ProductService.converterToImage(result);
            res.render('index', { productsList: prds, title: 'Products-List' });
        })
        .catch(err => console.log(err));

};


exports.getEditPage = (req, res, next) => {
    const productId = req.params.prodId;
    Product.findById(productId)
        .then(result => {
            res.render("../views/product/edit-page", { product: result, title: 'Edit-Page' });
        })
        .catch(err => console.log(err));

};


exports.postEditedProduct = (req, res, next) => {
    Product.findByIdAndUpdate(req.body.id)
        .then(oldProduct => {
            oldProduct.name = req.body.name;
            oldProduct.category = req.body.category;
            oldProduct.price = req.body.price;
            oldProduct.image = req.body.image;
            oldProduct.description = req.body.description;
            return oldProduct.save()

        })
        .then((resul) => {
            res.redirect('/details/'+req.body.id);
        })
        .catch(err => console.log(err));
};


exports.deleteProduct = (req, res, next) => {

    Product.deleteOne({ _id: req.body.id })
        .then(result => {
            res.redirect("/");
        })
        .catch(err => console.log(err));

};

exports.getDetailsOfProduct = (req, res, next) => {

    const prodId = req.params.prodId;
    Product.findById(prodId)
        .then(result => {
            res.render('../views/product/details', { products: result, title:"Product-details" });
        })
        .catch(err => console.log(err));

};