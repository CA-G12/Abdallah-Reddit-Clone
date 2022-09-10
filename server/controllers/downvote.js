const {downVote, registerVote, downVoteDatabase, hasHeVoted} = require('../database/queries/')
const jwt = require('jsonwebtoken');

const downvote = (req, res) => {
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
                        downVoteDatabase(decoded.user_id, req.params.id)
                        .then(downVote(req.params.id))
                        .then(res.json('Downvoted'))
                        
                    })
                } else {
                    if (!(response.rows[0].vote_status === 'down')) {
                        downVoteDatabase(decoded.user_id, req.params.id)
                        .then(downVote(req.params.id))
                        .then(downVote(req.params.id))
                        .then(res.json('Downvoted'))
                    }
                }
            })

        }
    }) 

}

module.exports = downvote;