const {join} = require('path');
const jwt = require('jsonwebtoken');

const privatePage = (req, res) => {
    if (req.cookies.token) {
        jwt.verify(req.cookies.token, 'reddit-clone-super-private-key-dont-hack-pls', (err, decoded) => {
            if (err) {
                res.clearCookie('token')
                res.redirect('/')
            } else {
                res.sendFile(join(__dirname, '..', '..', 'private', 'loggedin.html'))
            }
        })    
    } else {
        res.redirect('/')
    }
}

module.exports = privatePage;