const getAllPostsData = require("./getPostsData");
const addUserQuery = require("./signupQuery");
const { upVote, downVote, verifyVote, upVoteDatabase, downVoteDatabase } = require("./votes");

module.exports = {getAllPostsData, upVote, downVote, verifyVote, upVoteDatabase, downVoteDatabase, addUserQuery}