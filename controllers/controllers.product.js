const Product = require('../models/models.product');
const ProductService = require('../service/service.product');
const Cart=require('../models/models.cart');
const Order = require('../models/model.order');


//
exports.getProdPage = (req, res, next) => {
    res.render('../views/product/add-products', {fname:"Hi, "+req.session.user.firstname, title: "Add-Products",isAuthenticated:true});
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

            res.render('index', { fname:"", productsList: prds,isAuthenticated: true,title: 'Products-List' });
        })
        .catch(err => console.log(err));
     ProductService.clearFolder();
};

exports.getAdminPrds = (req, res, next) => {
    Product.find()
        .then(result => {
            let prds = ProductService.converterToImage(result);
            res.render('product/admin-list-of-prds', { fname:"Hi, "+req.session.user.firstname,productsList: prds,isAuthenticated: false, title: 'admin-products' });
        })
        .catch(err => console.log(err));
     ProductService.clearFolder();
};

exports.getCustomerPrds = (req, res, next) => {
    Product.find()
        .then(result => {
            let prds = ProductService.converterToImage(result);
            res.render('product/customer-list-of-prds', { fname:"Hi, "+req.session.user.firstname,productsList: prds,isAuthenticated: false,title: 'customer-products' });
        })
        .catch(err => console.log(err));
     ProductService.clearFolder();
};


exports.getEditPage = (req, res, next) => {
    const productId = req.params.prodId;
    Product.findById(productId)
        .then(result => {
            res.render("../views/product/edit-page", {fname:"Hi, "+req.session.user.firstname,product: result, title: 'Edit-Page',isAuthenticated:true });
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
            res.render('../views/product/details', { fname:"",products: tempArr[0], title:"Product-details",isAuthenticated:false});
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
    .then(cart=>{console.log(cart);
        if(!cart){
           return res.redirect('/customer-prds');
        }
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
        
            res.render('product/cartsPage', { fname:"Hi, "+req.session.user.firstname,cartId:cart._id, productsList: prds,totalPrice:totalPrice, qty:qtyArr ,isAuthenticated: false, title: 'carts' });
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

exports.payment = (req,res,next)=>{
    // console.log(req.params.tprice +"   "+req.params.cid);  <%=(totalprice+(totalprice*0.05))%>
     let totalwithTax =( Number(req.params.tprice)+(Number(req.params.tprice)*0.05)).toFixed(2);
     res.render('product/thanks', { fname:"Hi, "+req.session.user.firstname,totalprice:req.params.tprice,cartId:req.params.cid,totalwithTax:totalwithTax ,isAuthenticated: false, title: 'Thanks' })
}

exports.checkOut = (req,res,next)=>{
      Order.findOne({ userId : req.session.user._id })
      .then(order =>{ 
          if(order){
            allPidPriceMethod(req.session.user._id, req.params.cid, 0);
            res.render('../views/endpage',{fname:"Hi, "+req.session.user.firstname,isAuthenticated:false,title:"Thank-you-page"});
            // res.redirect('/customer-prds');
          }else{
            allPidPriceMethod(req.session.user._id, req.params.cid, 1);
            //res.render('product/thanks', { isAuthenticated: false, title: 'Thanks' })
            res.render('../views/endpage',{fname:"Hi, "+req.session.user.firstname,isAuthenticated:false,title:"Thank-you-page"});
            // res.redirect('/customer-prds');
          }
      })
      .catch(e=>console.log(e));
}

exports.orderHistory = (req,res,next)=>{
    Order.findOne({ userId : req.session.user._id })
    .then(order=>{
        let prdIds = [], priceQtyDate = [];
        for(let daily of order.allHistory.dailyHistory ){
            let prdWithPrice = daily.prdIdWithPrice;
            for(let pid of prdWithPrice){
                prdIds.push(pid.prdId );
                priceQtyDate.push({ pid:pid.prdId, oldPrice :pid.oldPrice, quantity:pid.quantity,date:daily.date });
            }

        }
        //console.log(prdIds);
        //console.log(priceQtyDate);
        Product.find({_id : {$in: prdIds}})
        .then(result => { 
            let prds = ProductService.converterToImage(result);
        let display = [], count=0;
        for(let p of priceQtyDate){

           for(let pobj of prds){
               if(pobj._id ==  p.pid.toString()){
display.push({ name:pobj.name , newPrice:pobj.price, image:pobj.image, oldPrice:p.oldPrice, quantity:p.quantity, date:p.date });       
                                   
               }
           }
        }
         console.log(display);
        res.render('product/history', {fname:"Hi, "+req.session.user.firstname, historyArr: display ,isAuthenticated: false, title: 'history' });
        });
    })
    .catch(e=>console.log(e));
}





function allPidPriceMethod(uid,cartId,separator){
     Cart.findOne({ _id : cartId})
     .then(cart=>{
         let arrPid = [];
        for(let pid of cart.listOfProds.prdArr){
            arrPid.push(pid.prdId);
        }
        // console.log(cart.listOfProds.prdArr);
       Product.find({_id : {$in: arrPid}})
       .then(prd=>{
        let prdIdWithPriceArr = [], c=0;
        for(let pid of prd){
            prdIdWithPriceArr.push({ prdId : pid._id, oldPrice : pid.price, quantity : cart.listOfProds.prdArr[c++].quantity });
        }
        //console.log(prdIdWithPriceArr);
        let dailyHistoryArr = [];
        dailyHistoryArr.push({ prdIdWithPrice : prdIdWithPriceArr, date: new Date()});

         if(separator == 1){
            const order = new Order({
                userId :uid,
                allHistory : {
                    dailyHistory : dailyHistoryArr
                }
            });
           // console.log(dailyHistoryArr);
           order.save();
         }else{
            Order.findOne({ userId : uid })
            .then(ord=>{
               // console.log(ord.allHistory.dailyHistory);
               let newDailyHistory = ord.allHistory.dailyHistory.concat(dailyHistoryArr);
               ord.allHistory.dailyHistory = newDailyHistory;
               ord.save();
            });
         }
      
       });
     })
     .catch(e=>console.log(e));
     Cart.deleteOne({_id : cartId}).then(a=>{});
} 
exports.aboutUs=(req,res,next)=>{
    res.render('about-us',{fname:"",isAuthenticated:true,title:"About us"})
}
