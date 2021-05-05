var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth')
const productController = require('../controllers/productController');

router.post('/products', productController.read_products); // /api/product/products
router.get('/:product_id', productController.read_product_one); // /api/product/:product_id
router.post('/season/:season', productController.read_season_products); // 
router.post('/season',productController.read_products)
// router.post('/season/:season/tone/', productController.read_season_tone); //
router.get('/season/:season/:product_id', productController.read_season_product_one); //
// router.post(':season&:tone', productController.read_season_tone);
// category2: lip/eye_shadow/cheek 
router.post('/category1/:category1', productController.read_category1_products); // 
router.post('/category2/:category2', productController.read_category2_products); // 




module.exports = router;