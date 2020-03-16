const router = require('express').Router();
const productController = require('../controllers/controllers.product');

router.get("/savePrd", productController.getProdPage);

module.exports = router;
