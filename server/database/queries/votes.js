const connection = require("../config/connection");


const upVote = (post_id) => {
    return connection.query('UPDATE posts SET post_votes = post_votes + 1 WHERE post_id = $1', [post_id]);
}

const downVote = (post_id) => {
    return connection.query('UPDATE posts SET post_votes = post_votes - 1 WHERE post_id = $1', [post_id]);
}

const verifyVote = (user_id, post_id) => {
    return connection.query('SELECT * from votes WHERE user_id = $1 AND post_id = $2', [user_id, post_id]);
}

const upVoteDatabase = (user_id, post_id) => {
    return connection.query('UPDATE votes SET vote_status = $3, vote_count = 1 WHERE user_id = $1 AND post_id = $2', [user_id, post_id, 'up']);
}

const downVoteDatabase = (user_id, post_id) => {
    return connection.query('UPDATE votes SET vote_status = $3, vote_count = 0 WHERE user_id = $1 AND post_id = $2', [user_id, post_id, 'down']);
}

module.exports = {upVote, downVote, verifyVote, downVoteDatabase, upVoteDatabase};