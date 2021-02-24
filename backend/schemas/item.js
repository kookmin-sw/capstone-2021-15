const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema; // 이게 없으면 mongoose.Schema.Types.ObjectId 라고 써야함
const ItemSchema = new Schema({
// 이건 나중에 
	title: {
		type: String,
		required: true,
		unique: true,
	},
	content: {
		type: String,
		required: true,
		unique: true,
	},
	personalColor: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Data.now,// 현재시각 저장
	},
	// 좋아요 누른 사람
	likes: [{
		type: ObjectId,
		ref: 'User',
	}],
});

module.exports = mongoose.model('Item', itemSchema);