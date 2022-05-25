const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema; // 이게 없으면 mongoose.Schema.Types.ObjectId 라고 써야함
const ClickProductSchema = new Schema({
    product_id: { // 이게 상품 Product의 디비에서의 _id가 될 것
        type: String
    },
    product_data_code: {
        type: String
    },
    user_season: {
        type: String,
    },
    product_season: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String
    }
});

module.exports = mongoose.model('ClickProduct', ClickProductSchema);
