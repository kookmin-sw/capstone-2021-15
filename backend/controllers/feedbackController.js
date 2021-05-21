//mongoose
const mongoose = require('mongoose');
const Feedback = require('../models/feedback');

module.exports = {
    save_feedback: async (req, res, next) => {
        try{
            const feedbackLog = new Feedback(req.body)
            await feedbackLog.save();
            return res.status(201)
                .json({
                    submitSuccess: true,
                    message: "feedback created"});
        } catch(err) {
            next(err)
        }
    }
}