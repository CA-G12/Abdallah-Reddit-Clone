const loginQuery = require('../database/queries/loginQuery');
const becrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const {loginusername, loginpassword} = req.body;

    loginQuery(loginusername)
    .then(response => response.rows[0])
    .then(response => {
        becrypt.compare(loginpassword, response.password, (err, result) => {
            if (err) res.json('Error');
            if (result) {
                jwt.sign({'isLogged': 'true', 'user_id': response.user_id}, 'reddit-clone-super-private-key-dont-hack-pls',
                 {expiresIn: '72h'}, (err, token) => {
                    res.cookie('token', token)
                    res.json('Logged In')
                 })
            } else {
                res.json('Error')
            }
        })
    })
    .catch(err => res.json('Error'))
}

module.exports = login;