const connection = require("../config/connection");

const addUserQuery = (username, password, email, profile_img, bio) => {
    return connection.query('INSERT INTO users (username, password, email, profile_img, bio) VALUES ($1, $2, $3, $4, $5)', [username, password, email, profile_img, bio])
}

module.exports = addUserQuery;