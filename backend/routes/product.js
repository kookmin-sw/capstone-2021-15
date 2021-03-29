var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth')
const productController = require('../controllers/productController');


router.post('/products', productController.products); // /api/product/products
router.get('/:product_id', productController.read_one); // /api/product/:product_id
router.get('/:season', productController.season_all); // /api/product/season
router.get('/:season/:product_id', productController.season_one); // /api/product/season
// category2: lip/eye_shadow/cheek 이런 식으로
router.get('/:category2', productController.read_category2); // /api/product/:category2

// router.get('/product/', auth, productController.all);
// router.get('/product/:product_id', auth, productController.read_one);
// router.get('/product/:season', auth, productController.read_one_pcrs);



module.exports = router;