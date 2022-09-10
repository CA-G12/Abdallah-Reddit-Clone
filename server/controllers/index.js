const login = require('./login');
const signup = require('./signup');
const getPosts = require('./getPosts');
const upvote = require('./upvote');
const downvote = require('./downvote');
const privatePage = require('./privatepage');
const userVerification = require('./userVerification');
const logout = require('./logout')
const createPost = require('./create-post');
const getUserById = require('./getUserById');
const DateFromNow = require('./dateFromNow');
const getNewPosts = require('./getNewPosts');

module.exports = {login, signup, getPosts, upvote, downvote, privatePage, userVerification, logout, createPost, getUserById, DateFromNow, getNewPosts}
