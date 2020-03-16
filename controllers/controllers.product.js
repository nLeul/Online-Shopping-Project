const Product = require('../models/models.product');

exports.getProdPage = (req, res, next) => {
     res.render('../views/product/add-products',{title:"Add-Products"});

};