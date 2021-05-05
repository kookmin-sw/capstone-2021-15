//mongoose
const mongoose = require('mongoose');
const ClickProduct = require('../models/clickProduct');

module.exports = {
    save_click_product_log: async (req, res, next) => {
        try{
            const clickLog = new ClickProduct(req.body)
            await clickLog.save();
            return res.status(201)
                .json({
                    clickLogSuccess: true,
                    message: "click log created"});
        } catch(err) {
            next(err)
        }
    }
}