var express = require('express');
var router = express.Router();

const Item = require('../controllers/itemController')

router.post('/:item_id', Like.toggle_like);