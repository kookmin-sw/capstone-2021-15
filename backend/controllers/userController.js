//mongoose
const mongoose = require('mongoose'); 
const User = require('../models/user');

// hashing password
const bcrypt = require('bcrypt');


const createUserData = async (userInput) => {
    const user = await userWithEncodedPassword(userInput);
    return user.save();
};

const userWithEncodedPassword = async ({nickName, password, age}) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        nickName,
        password: hashedPassword,
    });
    return user;
}

module.exports = {
    // 회원가입
    // 회원 가입 시 필요한 정보들을 client에서 가져오기
    // 그것들을 데이터베이스에 넣어준다
    signup : async (req, res, next) => {
        try {
            const {nickName} =  req.body;
            const user =  await User.findOne({ nickName });
            if (user) {
                return res.json({success: false, message:'User existed'});
            }
            await createUserData(req.body);
            return res.status(201).json({success: true, message: "User Created"});
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) =>{
        // 요청된 nickName이 데이터베이스에 있는지 찾음
        await User.findOne({ nickName: req.body.nickName }, (err, user) => {
            if(!user){
                return res.json({
                    loginSuccess: false,
                    message: "해당하는 nickName이 없습니다"
                })
            }
            // 요청된 nickName이 데이터베이스에 있다면 비밀번호가 맞는지 확인
            user.comparePassword(req.body.password, (err, isMatch) => {
                if( !isMatch){
                    return res.json({ loginSuccess: false, message:"password not matching"})
                } 
                // 비밀번호 일치 시 토큰 발행하기
                user.generateToken((err, user) => {
                    if(err) return res.status(400).send(err);
                
                    // 토큰을 쿠키나 로컬스토리지, 세션에 저장한다
                    // 쿠키에 저장한다
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess:true, userId: user._id});
                })
            }) 
        })
    },

    auth: (req, res) => {
        // auth 미들웨어가 통과한 것은 authentication이 true라는 의미
        res.status(200).json({
            _id: req.user._id,
            nickName : req.user.nickName,
            role: req.user.role,
            isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            like: req.user.like,
            season: req.user.season,
            tone: req.user.tone,
            pccs: req.user.pccs,
            interestCategory: req.user.interestCategory,

        })
    },

    logout: async (req, res) => {
        // req: auth 미들웨어에서 받은
        // token: '' : 토큰 지우기
        await User.findOneAndUpdate({_id: req.user._id}, { token : "" }, (err, user) => {
            if(err) return res.json({ success: false, err});
            return res.status(200).send({ success : true });
        })
    },

	// 유저 삭제
    delete: async (req, res, next) => {
        await User.deleteOne({_id:req.params.user_id});
        return res.json({
            message: "user delete completely",
        });
    }
}
