const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema; // 이게 없으면 mongoose.Schema.Types.ObjectId 라고 써야함
const FeedbackSchema = new Schema({
    feedback:{
        type: String
    },
    user_id: {
        type: String
    },
    comment: {
        type: String
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
