const getNewPostsQuery = require('../database/queries/getNewPostsQuery');

const getNewPosts = (req, res) => {
    getNewPostsQuery()
    .then(response => res.json(response.rows))
    .catch(err => res.json('Error'))
}

module.exports = getNewPosts;