var express = require('express');
var router = express.Router();
const recommendFeedbackController = require('../controllers/recommendFeedbackController');

// /api/recommend-feedback
router.post('/', recommendFeedbackController.save_feedback);

module.exports = router;