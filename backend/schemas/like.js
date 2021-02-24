const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const LikeSchema = new Schema({
	User: {
		type: ObjectId,
		ref: 'User',
	},
	Item: { 
		type: ObjectId, 
		ref: 'Item', 
	}, 
});

module.exports = mongoose.model('Like', LikeSchema);