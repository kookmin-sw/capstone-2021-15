const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema; // 이게 없으면 mongoose.Schema.Types.ObjectId 라고 써야함
const ProductSchema = new Schema({
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
	'img-url': { // 이미지
		type: String,
	},
	'color-url':{
		type: String
	},
	price: {
		type: Number
	},
	'data-code': {
		type: String
	},
	brand: { 
		type: String, 
	},
	category1: {
		type: String,
	},
	category2: { 
		type: String,
	},
	season: {
		type: String,
	},
	tone: {
		type: String,
	},
	pccs:{
		type: String,
	},
	// 상품 가져올 때 클릭 로그가 높은 순으로 가져오는 것을 고려할 것
	click_log: {
		type: Number,
		default: 0,
	},
	// 좋아요 누른 사람
	likes: [{
		type: ObjectId,
		ref: 'User',
	}],
});

module.exports = mongoose.model('Product', ProductSchema);
