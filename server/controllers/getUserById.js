const {getUserByIdQuery} = require('../database/queries/getUserData');

const getUserById = (req, res) => {
    getUserByIdQuery(req.params.id)
    .then(response => res.json(response.rows[0]))
    .catch(err => {
        console.log(err)
        res.json('Error')
    })
}

module.exports = getUserById;