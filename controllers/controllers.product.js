const Product = require('../models/models.product');
const ProductService = require('../service/service.product');
const Cart=require('../models/models.cart');


//
exports.getProdPage = (req, res, next) => {
    res.render('../views/product/add-products', { title: "Add-Products",isAuthenticated:true});
};

exports.saveProduct = (req, res, next) => {

    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: req.file.buffer.toString('base64'),
        // image: ProductService.convertToBase64(req.body.image),
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
            res.render('index', { productsList: prds,isAuthenticated: true,title: 'Products-List' });
        })
        .catch(err => console.log(err));
     ProductService.clearFolder();
};

exports.getAdminPrds = (req, res, next) => {
    Product.find()
        .then(result => {
            let prds = ProductService.converterToImage(result);
            res.render('product/admin-list-of-prds', { productsList: prds,isAuthenticated: false, title: 'admin-products' });
        })
        .catch(err => console.log(err));
     ProductService.clearFolder();
};

exports.getCustomerPrds = (req, res, next) => {
    Product.find()
        .then(result => {
            let prds = ProductService.converterToImage(result);
            res.render('product/customer-list-of-prds', { productsList: prds,isAuthenticated: false,title: 'customer-products' });
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


//add to cart  
exports.addToCart=(req,res,next)=>{
   // Cart.addToCart(req.session.user._id,req.body.id,req.body.quantity);
Cart.findOne({userId : req.session.user._id})
.then(carts=>{
    if(carts){
            for(let temp of carts.listOfProds.prdArr){
                if(temp.prdId.toString() == req.body.id.toString()){
                    temp.quantity=Number( temp.quantity)+Number(req.body.quantity);
                  //  carts.listOfProds.prdArr.push(temp);
                     carts.save();
                     return res.redirect('/customer-prds');
                }
            }
            carts.listOfProds.prdArr.push({prdId:req.body.id, quantity:req.body.quantity});
             carts.save();
             return res.redirect('/customer-prds');
    }else{
        let arr = []; arr.push({prdId:req.body.id, quantity:req.body.quantity});
        const cart = new Cart({
         userId:req.session.user._id,
         listOfProds:{
             prdArr:arr
         }
        });
     
        cart.save().then(r=>res.redirect('/customer-prds')).catch(e=>console.log(e));
        
    }
})
.catch(e=>console.log(e));

}

exports.listOfCart = (req,res,next)=>{
    Cart.findOne({userId : req.session.user._id})
    .then(cart=>{
        let arr = [],qtyArr =[];
        for(let pid of cart.listOfProds.prdArr){
            arr.push(pid.prdId);
            qtyArr.push(pid.quantity);
        }
        Product.find({_id : {$in: arr}})
        .then(result => { 
            let prds = ProductService.converterToImage(result);
            let totalPrice=0,count=0;
            for(let p of prds){
                totalPrice+=(p.price*qtyArr[count])
            }
            res.render('product/cartsPage', { productsList: prds,totalPrice:totalPrice, qty:qtyArr ,isAuthenticated: false, title: 'carts' });
        })
        .catch(err => console.log(err));
     ProductService.clearFolder();
    })
    .catch(e=>console.log(e));
}

exports.deleteFromCart = (req,res,next)=>{
    Cart.findOne({userId : req.session.user._id})
    .then(cart=>{
        const cartProductIndex = cart.listOfProds.prdArr.findIndex(cp => {
            return cp.prdId.toString() === req.params.pid.toString();
        });
        cart.listOfProds.prdArr.splice(cartProductIndex,1);
        cart.save();
        res.redirect('/list-of-cart')
    })
    .catch(e=>console.log(e));
}