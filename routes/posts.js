var PostsHandler = require('../handlers/posts');
var express = require('express');
var router = express.Router();
var postsHandler = new PostsHandler();

router.get('/', postsHandler.getAllPosts);
router.get('/getWithUsers', postsHandler.getPostsWithUser);
router.post('/', postsHandler.createPost);

module.exports = router;