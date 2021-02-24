const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
	nickName: {
		type: String,
		trim: true, // 문자열 공백 제거
		unique: true,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	personalColor: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Data.now,// 현재시각 저장
	},
});

module.exports = mongoose.model('User', userSchema);