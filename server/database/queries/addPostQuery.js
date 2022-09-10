const connection = require("../config/connection");


const addPostQuery = (postTitle, postImage, postContent, user_id, post_date) => {
    return connection.query('INSERT INTO posts (post_title, post_img, post_content, post_votes, user_id, post_date) VALUES ($1, $2, $3, $4, $5, $6)', [postTitle, postImage, postContent, 0, user_id, post_date]);
}

module.exports = addPostQuery;