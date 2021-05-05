//mongoose
const mongoose = require('mongoose');
const BuyProduct = require('../models/buyProduct');
module.exports = {
    save_buy_product_log: async (req, res, next) => {
        try{
            const clickLog = new BuyProduct(req.body)
            await clickLog.save();
            return res.status(201)
                .json({
                    clickLogSuccess: true,
                    message: "buy log created"});
        } catch(err) {
            next(err)
        }
    }
}