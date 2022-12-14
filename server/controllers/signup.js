const joi = require('joi');
const becrypt = require('bcrypt');
const addUserQuery = require('../database/queries/signupQuery')
const {getUserByUsername} = require('../database/queries/getUserData');

const signup = (req, res) => {
    const {usernameinput, emailinput, passwordinput, confirmpasswordinput, profileimginput, bioinput} = req.body;

    const schema = joi.object({
        usernameinput: joi.string().required(),
        emailinput: joi.string().email().required(),
        passwordinput: joi.string().min(8).max(20).alphanum().required(),
        confirmpasswordinput: joi.string().required().valid(joi.ref('passwordinput')),
        profileimginput: joi.string().required(),
        bioinput: joi.string().required()
    })

    schema.validateAsync(req.body)
    .then(result => {
        getUserByUsername(usernameinput)
        .then(response => {
            if (response.rows[0]) {
                throw Error('Username Already Exists')
            } else {
                becrypt.hash(passwordinput, 10, (err, hash) => {
                    if (err) throw err;
                    addUserQuery(usernameinput, hash, emailinput, profileimginput, bioinput)
                    .then(res.json('Success'))
                })
            }
        })
        .catch(err => res.json('Username Already Exists'))
    })
    .catch(err => {
        console.log('Error: ' + err.message)
        res.json('Error: ' + err.message)
})
}

module.exports = signup;