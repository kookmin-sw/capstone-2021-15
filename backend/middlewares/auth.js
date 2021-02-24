const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(req.cookies.user, process.env.SECRET_KEY);

        if (decoded) {
            res.locals.email = decoded.email;
            next();

        } else {
            res.status(401).json({ error: 'unauthorized' });
        }
    } catch (err) {
        res.status(401).json({ error: 'token expired' });
    }

};
exports.verifyToken = verifyToken;