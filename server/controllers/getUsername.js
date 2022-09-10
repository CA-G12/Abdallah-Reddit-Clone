const {getUserByIdQuery} = require('../database/queries/getUserData');
const jwt = require('jsonwebtoken');

const getUsername = (req, res) => {
    jwt.verify(req.cookies.token, 'reddit-clone-super-private-key-dont-hack-pls', (err, decoded) => {
        if (err) {
            res.clearCookie('token')
            res.json('Not Authorized');
        } else {
            getUserByIdQuery(decoded.user_id)
            .then(response => res.json(response.rows[0].username))
        }
    })   
}

module.exports = getUsername;