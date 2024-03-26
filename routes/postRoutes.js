const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


router.get('/', postController.getAllPosts);


router.get('/posts/new', postController.renderNewPostForm);


router.post('/posts', postController.createPost);


router.get('/posts/:id', postController.getPostById);


router.post('/posts/:id/comments', postController.addComment);

module.exports = router;