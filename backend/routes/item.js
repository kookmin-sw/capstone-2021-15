var express = require('express');
var router = express.Router();
const itemController = require('../controllers/itemController');


router.get('/all', itemController.all_items); // /items/all
router.get('/:item_id', itemController.read_one); // /items/:item_id
router.get('/personalColor/:personalColor/all', itemController.read_pcrs); // /items/personalColor/all/personalColor
router.get('/personalColor/:personalColor', itemController.read_pcrs_one); // /items/personalColor/:personalColor
router.get('/category/:category2/all', itemController.read_category2);
router.get('/category/:category2', itemController.read_category2_one);

// router.get('/items/', auth, itemController.all);
// router.get('/items/:item_id', auth, itemController.read_one);
// router.get('/items/:personalColor', auth, itemController.read_one_pcrs);



module.exports = router;