const router = require('express').Router();
const productController = require('../controllers/controllers.product');

router.get("/savePrd", productController.getProdPage);
router.post("/save-product", productController.saveProduct);

router.get('/', productController.getHomePage);


router.get('/Edit-product/:prodId', productController.getEditPage);

module.exports = router;
