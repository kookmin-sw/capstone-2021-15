var express = require('express');
var router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// /api/feedback
router.post('/', feedbackController.save_feedback);

module.exports = router;