const jwt = require('jsonwebtoken');
const addPostQuery = require('../database/queries/addPostQuery');
const moment = require('moment'); 


const createPost = (req, res) => {
    jwt.verify(req.cookies.token, 'reddit-clone-super-private-key-dont-hack-pls', (err, decoded) => {
        if (err) {
            res.clearCookie('token')
            res.json('Not Authorized');
        } else {
            const {postTitle, postContent} = req.body;
            const user_id = decoded.user_id;
            const post_date = new Date();
            addPostQuery(postTitle, postContent, user_id, post_date)
            .then(res.json('Success'))
        }
    })    
}


module.exports = createPost;