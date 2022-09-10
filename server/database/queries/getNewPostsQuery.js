const connection = require("../config/connection");


const getNewPostsQuery = () => {
    return connection.query('SELECT * FROM posts ORDER BY post_date DESC;');
}

module.exports = getNewPostsQuery;