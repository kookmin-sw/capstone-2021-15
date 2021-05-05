var express = require('express');
var router = express.Router();
const buyProductController = require('../controllers/buyProductController');

// /api/buy-product/buy-log
router.post('/buy-log', buyProductController.save_buy_product_log);

module.exports = router;