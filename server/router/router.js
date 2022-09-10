const router = require('express').Router();
const {login, signup, getPosts, upvote, downvote, privatePage} = require('../controllers/')

router.get('/api/posts', getPosts)

router.get('/upvote/:id', upvote)

router.get('/downvote/:id', downvote)

router.get('/u', privatePage)

router.post('/signup', signup)

router.post('/login', login)


module.exports = router