const {downVote, verifyVote, downVoteDatabase} = require('../database/queries/')

const downvote = (req, res) => {
    verifyVote(1, req.params.id)
    .then(response => response.rows)
    .then(response => {
        if (response.length !== 0 && response[0].vote_count !== 0) {
            downVoteDatabase(1, req.params.id)
            .then(downVote(req.params.id))
        } else {
            throw Error('Only One Vote is Allowed')
        }
    })
    .catch(err => console.log(err))

} 

module.exports = downvote;