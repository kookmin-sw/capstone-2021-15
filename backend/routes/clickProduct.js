var express = require('express');
var router = express.Router();
const clickProductController = require('../controllers/clickProductController');

// /api/click-product/click-log
router.post('/click-log', clickProductController.save_click_product_log);

module.exports = router;