//mongoose
const mongoose = require('mongoose');
const RecommendFeedback = require('../models/recommendFeedback');

module.exports = {
    save_feedback: async (req, res, next) => {
        try{
            const feedbackLog = new RecommendFeedback(req.body)
            await feedbackLog.save();
            return res.status(201)
                .json({
                    submitSuccess: true,
                    message: "recommend feedback created"});
        } catch(err) {
            next(err)
        }
    }
}