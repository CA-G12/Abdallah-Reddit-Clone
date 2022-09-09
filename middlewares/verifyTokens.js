const jwt = require('jsonwebtoken');

const verifyTokens = (req, res, next) => {
    if (req.cookies.token) {
        jwt.verify(req.cookies.token, 'reddit-clone-super-private-key-dont-hack-pls', (err, decoded) => {
            if (err) {
                res.clearCookie('token')
                next();
            } else {
                next();
            }
        })    
    } else {
        next();
    }
}

module.exports = verifyTokens;

