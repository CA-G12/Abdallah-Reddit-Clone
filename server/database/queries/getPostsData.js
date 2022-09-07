const connection = require("../config/connection");


const getAllPostsData = () => {
    return connection.query('SELECT * FROM posts ORDER BY post_votes DESC;');
}

module.exports = getAllPostsData;