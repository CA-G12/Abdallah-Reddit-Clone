const connection = require("../config/connection");

const getUserByUsername = (username) => {
    return connection.query('SELECT * FROM users WHERE username = $1', [username])
}

const getUserByIdQuery = (id) => {
    return connection.query('SELECT username FROM users WHERE user_id = $1', [id])
}


module.exports = {getUserByUsername, getUserByIdQuery};