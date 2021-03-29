const User = require('../models/user');

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳
    // 클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth; // controllers/userController에서 generateToken할 때 x_auth에 토큰을 저장했었다
    // 토큰을 decode하고 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth : false, error: true })

        req.token = token;
        req.user = user;
        next();
    })
    // 유저가 있으면 authentication ok
    // 유저가 없으면 authentication false
}

module.exports = { auth };