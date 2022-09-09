const router = require('express').Router();
const {getAllPostsData, upVote, downVote, verifyVote, upVoteDatabase, downVoteDatabase} = require('../database/queries/index')
const {join} = require('path');
const signup = require('../controllers/signup');
const login = require('../controllers/login');


router.get('/api/posts', (req, res) => {
    getAllPostsData()
    .then(response => res.json(response.rows))
    .catch(err => console.log(err))
})

router.get('/upvote/:id', (req, res) => {
    verifyVote(1, req.params.id)
    .then(response => response.rows)
    .then(response => {
        if (response.length !== 0 && response[0].vote_count !== 1) {
            upVoteDatabase(1, req.params.id)
            .then(upVote(req.params.id))
        } else {
            throw Error('Only One Vote is Allowed')
        }
    })
    .catch(err => console.log(err))
    
})

router.get('/downvote/:id', (req, res) => {
    verifyVote(1, req.params.id)
    .then(response => response.rows)
    .then(response => {
        if (response.length !== 0 && response[0].vote_count !== 0) {
            downVoteDatabase(1, req.params.id)
            .then(downVote(req.params.id))
        } else {
            throw Error('Only One Vote is Allowed')
        }
    })
    .catch(err => console.log(err))
})

router.get('/page', (req, res) => {
    res.sendFile(join(__dirname, '..', '..', 'private', 'loggedin.html'))
})

router.post('/signup', signup)

router.post('/login', login)


module.exports = router