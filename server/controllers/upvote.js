const {upVote, verifyVote, upVoteDatabase} = require('../database/queries/')

const upvote = (req, res) => {
    verifyVote(1, req.params.id)
    .then(response => response.rows)
    .then(response => {
        if (response.length !== 0 && response[0].vote_count !== 1) {
            upVoteDatabase(1, req.params.id)
            .then(upVote(req.params.id))
        } else {
            throw Error('Only One Vote is Allowed')
        }
    })
    .catch(err => console.log(err))
}

module.exports = upvote
