const Product = require('../models/models.product');
const ProductService = require('../service/service.product');

//
exports.getProdPage = (req, res, next) => {
    res.render('../views/product/add-products', { title: "Add-Products",isAuthenticated:true});
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
            res.redirect('/admin-prds');
        })
        .catch(err => console.log(err));
};

exports.getHomePage = (req, res, next) => {
    Product.find()
        .then(result => {
            let prds = ProductService.converterToImage(result);
<<<<<<< HEAD
            res.render('index', { productsList: prds,isAuthenticated:false,title: 'Products-List' });
=======
            res.render('index', { productsList: prds,isAuthenticated: false,title: 'Products-List' });
>>>>>>> 82494ef4cbf1a3341f23bff5be31b8178e330dca
        })
        .catch(err => console.log(err));
     ProductService.clearFolder();
};

exports.getAdminPrds = (req, res, next) => {
    Product.find()
        .then(result => {
            let prds = ProductService.converterToImage(result);
<<<<<<< HEAD
            res.render('product/admin-list-of-prds', { productsList: prds, title: 'admin-products',isAuthenticated:true });
=======
            res.render('product/admin-list-of-prds', { productsList: prds,isAuthenticated: true, title: 'admin-products' });
>>>>>>> 82494ef4cbf1a3341f23bff5be31b8178e330dca
        })
        .catch(err => console.log(err));
     ProductService.clearFolder();
};

exports.getCustomerPrds = (req, res, next) => {
    Product.find()
        .then(result => {
            let prds = ProductService.converterToImage(result);
<<<<<<< HEAD
            res.render('product/customer-list-of-prds', { productsList: prds, title: 'customer-products',isAuthenticated:true });
=======
            res.render('product/customer-list-of-prds', { productsList: prds,isAuthenticated: true,title: 'customer-products' });
>>>>>>> 82494ef4cbf1a3341f23bff5be31b8178e330dca
        })
        .catch(err => console.log(err));
     ProductService.clearFolder();
};


exports.getEditPage = (req, res, next) => {
    const productId = req.params.prodId;
    Product.findById(productId)
        .then(result => {
            res.render("../views/product/edit-page", { product: result, title: 'Edit-Page',isAuthenticated:true });
        })
        .catch(err => console.log(err));

};


exports.postEditedProduct = (req, res, next) => {
    Product.findByIdAndUpdate(req.body.id)
        .then(oldProduct => {
            oldProduct.name = req.body.name;
            oldProduct.category = req.body.category;
            oldProduct.price = req.body.price;
            oldProduct.image = oldProduct.image;
            oldProduct.description = req.body.description;
            return oldProduct.save()

        })
        .then((resul) => {
            res.redirect('/admin-prds');
        })
        .catch(err => console.log(err));
};
exports.deleteProduct = (req, res, next) => {

    Product.deleteOne({ _id: req.body.id })
        .then(result => {
             res.redirect("/admin-prds");
        })
        .catch(err => console.log(err));

};

exports.getDetailsOfProduct = (req, res, next) => {

    const prodId = req.params.prodId;
    Product.findById(prodId)
        .then(result => {
            let tempArr = []; tempArr.push(result);
            tempArr = ProductService.converterToImage(tempArr);
            res.render('../views/product/details', { products: tempArr[0], title:"Product-details",isAuthenticated:false});
        })
        .catch(err => console.log(err));
        ProductService.clearFolder();
};