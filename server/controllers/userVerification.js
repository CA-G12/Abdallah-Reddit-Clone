const jwt = require('jsonwebtoken');

const userVerification = (req, res, next) => {
    if (req.cookies.token) {
        jwt.verify(req.cookies.token, 'reddit-clone-super-private-key-dont-hack-pls', (err, decoded) => {
            if (err) {
                res.clearCookie('token')
                res.json('Not Authorized');
            } else {
                res.json('Authorized')
            }
        })    
    } else {
        res.json('Not Authorized');
    }
}

module.exports = userVerification;