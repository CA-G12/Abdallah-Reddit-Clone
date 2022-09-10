const {getAllPostsData} = require('../database/queries/')

const getPosts = (req, res) => {
    getAllPostsData()
    .then(response => res.json(response.rows))
    .catch(err => res.json('Error'))
}

module.exports = getPosts;