const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;
const userSchema = new Schema({
	nickName: {
		type: String,
		trim: true, // 문자열 공백 제거
		unique: true,
		required: true,
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
	age: {
		type: Number,
	},
	// personal_color: {
	// 	type: String,
	// },
	season: {
		type: String,
	},
	tone: {
		type: String,
	},
	pccs:{
		type: String,
	},
	token: {
		type: String,
	},
	role: {
		type: Number,
		default: 0,
	},
	interestCategory:{
		type: Array,
		default: []
	},
	like: {
		type: Array,
		default: []
	}
	// createdAt: {
	// 	type: Date,
	// 	default: Date.now,// 현재시각 저장
	// },
});


userSchema.methods.comparePassword = function(plainPassword, callback) {
	// plainPassword: 원래 password와 데이터베이스에 저장된 해쉬화된 password를 비교해야함
	// plainPassword를 해쉬화하고 데이터베이스에 저장된 것과 비교한다
	bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
		if(err) return callback(err);
		callback(null, isMatch); // true 리턴
	})
	// controllers/userController login 함수 확인
}

userSchema.methods.generateToken = function(callback) {
	var user = this;
	// jwt를 이용해 토큰을 발행한다
	const token = jwt.sign(user._id.toHexString(), 'secretToken');
	user.token = token;
	user.save(function(err, user) {
		if (err) return callback(err);
		callback(null, user);
	})

}

userSchema.statics.findByToken = function(token, callback) {
	var user = this;
	// 토큰을 decode
	jwt.verify(token, 'secretToken', function(err, decoded) { // decoded는 user._id
		// 유저 아이디를 이용해 유저를 찾은 후 
		// 클라이언트의 토큰과 디비의 토큰이 일치하는지 확인
		user.findOne({"_id" : decoded, "token" : token}, function(err, user) {
			if (err) return callback(err);
			callback(null, user);
		})
	})

}

module.exports = mongoose.model('User', userSchema);
