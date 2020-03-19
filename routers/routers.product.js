const router = require('express').Router();
const productController = require('../controllers/controllers.product');
const Authontication = require('../middleware/authentication');
const Permit = require('../middleware/authorization');

//below all about admin
router.get("/savePrd", Authontication, Permit('admin'), productController.getProdPage);
router.post("/save-product", Authontication, Permit('admin'), productController.saveProduct);

router.get('/Edit-product/:prodId', Authontication, Permit('admin'), productController.getEditPage);
router.post("/post-prod", Authontication, Permit('admin'), productController.postEditedProduct);

router.post("/delete-product", Authontication, Permit('admin'), productController.deleteProduct);

router.get('/admin-prds', Authontication, Permit('admin'), productController.getAdminPrds);

//below all about customer
router.get('/customer-prds', Authontication, Permit('customer'), productController.getCustomerPrds);
//////cart router    /list-of-cart
router.post('/add-to-product',Authontication, Permit('customer'),productController.addToCart);

router.get('/list-of-cart',Authontication, Permit('customer'),productController.listOfCart);

router.get('/delete-cart/:pid',Authontication, Permit('customer'),productController.deleteFromCart);
//about us
router.get('/about-us',productController.aboutUs);

module.exports = router;         
