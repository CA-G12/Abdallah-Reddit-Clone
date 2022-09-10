const connection = require("../config/connection");


const upVote = (post_id) => {
    return connection.query('UPDATE posts SET post_votes = post_votes + 1 WHERE post_id = $1', [post_id]);
}

const downVote = (post_id) => {
    return connection.query('UPDATE posts SET post_votes = post_votes - 1 WHERE post_id = $1', [post_id]);
}

const registerVote = (user_id, post_id) => {
    return connection.query('INSERT INTO votes (user_id, post_id, vote_status, vote_count) VALUES ($1, $2, $3, $4)', [user_id, post_id, 'Neutral', '0']);
}

const hasHeVoted = (user_id, post_id) => {
    return connection.query('SELECT * FROM votes WHERE user_id = $1 AND post_id = $2', [user_id, post_id])
}

const upVoteDatabase = (user_id, post_id) => {
    return connection.query('UPDATE votes SET vote_status = $3, vote_count = 1 WHERE user_id = $1 AND post_id = $2', [user_id, post_id, 'up']);
}

const downVoteDatabase = (user_id, post_id) => {
    return connection.query('UPDATE votes SET vote_status = $3, vote_count = 1 WHERE user_id = $1 AND post_id = $2', [user_id, post_id, 'down']);
}

module.exports = {upVote, downVote, registerVote, downVoteDatabase, upVoteDatabase, hasHeVoted};