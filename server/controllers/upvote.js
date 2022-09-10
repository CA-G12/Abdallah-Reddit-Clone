const {upVote, registerVote, upVoteDatabase, hasHeVoted} = require('../database/queries/')
const jwt = require('jsonwebtoken');


const upvote = (req, res) => {
    jwt.verify(req.cookies.token, 'reddit-clone-super-private-key-dont-hack-pls', (err, decoded) => {
        if (err) {
            res.clearCookie('token')
            res.json('Not Authorized');
        } else {
            hasHeVoted(decoded.user_id, req.params.id)
            .then(response => {
                if (response.rowCount === 0) {
                    registerVote(decoded.user_id, req.params.id)
                    .then(response => {
                            upVoteDatabase(decoded.user_id, req.params.id)
                            .then(upVote(req.params.id))
                            .then(res.json('Upvoted'))

                    })
                } else {
                    if (!(response.rows[0].vote_status === 'up')) {
                        upVoteDatabase(decoded.user_id, req.params.id)
                        .then(upVote(req.params.id))
                        .then(upVote(req.params.id))
                        .then(res.json('Upvoted'))
                    }
                }
            })

        }
    }) 

}

module.exports = upvote
