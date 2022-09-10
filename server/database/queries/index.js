const getAllPostsData = require("./getPostsData");
const addUserQuery = require("./signupQuery");
const { upVote, downVote, registerVote, upVoteDatabase, downVoteDatabase, hasHeVoted } = require("./votes");

module.exports = {getAllPostsData, upVote, downVote, registerVote, upVoteDatabase, downVoteDatabase, addUserQuery, hasHeVoted}