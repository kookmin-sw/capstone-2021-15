var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/signUp',userController.signUp); // 회원가입
router.post('/signIn',userController.signIn); // 로그인
router.get('/all',userController.show_all); // 모든 회원 정보 보기
router.delete('/delete/:user_id',userController.delete); // 계정 삭제하기 

module.exports = router;