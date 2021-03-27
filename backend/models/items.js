const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema; // 이게 없으면 mongoose.Schema.Types.ObjectId 라고 써야함
const ItemSchema = new Schema({
	title: { // 허니트랩 보스턴백
		type: String,
		required: true,
	},
	link: {
		type: String
	},
	image: { // 이미지
		type: String,
	},
	lprice: {
		type: String
	},
	mallName:{
		type: String
	},
	productId: {
		type: String
	},
	productType:{ // 2 -> 네이버 예시 보기
		type: Number,
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
	category3: { // 보스턴백
		type: String,
	},
	category4: {
		type: String,
	},
	personalColor: {
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
