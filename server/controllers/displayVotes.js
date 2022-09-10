const {hasHeVoted} = require('../database/queries/votes');
const jwt = require('jsonwebtoken');

const displayVotes = (req, res) => {
    jwt.verify(req.cookies.token, 'reddit-clone-super-private-key-dont-hack-pls', (err, decoded) => {
        if (err) {
            res.clearCookie('token')
            res.json('Not Authorized');
        } else {
            hasHeVoted(decoded.user_id, req.params.postid)
            .then(response => response.rows)
            .then(response => res.json(response))
            .catch(err => console.log(err) )
        }
    }) 

}

module.exports = displayVotes;