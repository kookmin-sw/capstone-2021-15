const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema; // 이게 없으면 mongoose.Schema.Types.ObjectId 라고 써야함
const ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	title: { 
		type: String,
		required: true,
	},
	link: {
		type: String
	},
	img_url: { // 이미지
		type: String,
	},
	color_url:{
		type: String
	},
	price: {
		type: String
	},
	data_code: {
		type: String
	},
	brand: { // 브랜드
		type: String, 
	},
	category1: { // 패션잡화
		type: String,
	},
	category2: { // 여행용가방/소품
		type: String,
	},
	personal_color: {
		type: String,
		// required: true,
	},
	click_log: {
		type: Number,
		default: 0,
		required: true
	},
	// 좋아요 누른 사람
	likes: [{
		type: ObjectId,
		ref: 'User',
	}],
});

module.exports = mongoose.model('Item', ItemSchema);
