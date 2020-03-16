const router = require('express').Router();
const productController = require('../controllers/controllers.product');

router.get("/savePrd", productController.getProdPage);
router.post("/save-product", productController.saveProduct);

module.exports = router;
