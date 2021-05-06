var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const {auth} = require('../middlewares/auth');
const faceController = require('../controllers/faceController');

/* GET users listing. */
router.post('/signup', userController.signup);
router.post('/login', userController.login); // 로그인
router.get('/auth', auth, userController.auth); // 회원만 접근 가능한 페이지
router.get('/logout', auth, userController.logout); // 로그아웃
router.post('/face', faceController.uploadImage)

// router.get('/all',userController.show_all); // 모든 회원 정보 보기
// router.delete('/delete/:user_id',userController.delete); // 계정 삭제하기 


module.exports = router;

