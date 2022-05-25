var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth')
const productController = require('../controllers/productController');

router.post('/products', productController.read_products); // /api/product/products
router.post('/product_by_datacode', productController.read_product_by_datacode); // /api/product/product_by_id
router.post('/season/:season', productController.read_season_products);
router.post('/season',productController.read_products)
// router.post('/season/:season/tone/', productController.read_season_tone);
router.get('/season/:season/:product_id', productController.read_season_product_one);
// category2: lip/eye_shadow/cheek 
// router.post('/category1/:category1', productController.read_category1_products);
router.post('/category2/:category2', productController.read_category2_products);
router.post('/impression/product_by_id', productController.update_impression); // impression update
router.post('/click-log/product_by_id', productController.update_click_log); // click-log update
module.exports = router;