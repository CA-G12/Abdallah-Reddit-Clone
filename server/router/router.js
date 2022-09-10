const router = require('express').Router();
const {login, signup, getPosts, getNewPosts, upvote, downvote, privatePage, userVerification, logout, createPost, getUserById, DateFromNow, getUsername, displayVotes} = require('../controllers/')

router.get('/api/posts', getPosts)

router.get('/api/newposts', getNewPosts)


router.get('/upvote/:id', upvote)

router.get('/downvote/:id', downvote)

router.get('/u', privatePage)

router.post('/signup', signup)

router.post('/login', login)

router.post('/create-post', createPost)

router.get('/logout', logout)

router.get('/userVerification', userVerification)

router.get('/getUserById/:id', getUserById)

router.get('/fromnow/:date', DateFromNow)

router.get('/getUsername', getUsername)

router.get('/displayVotes/:postid', displayVotes)


module.exports = router