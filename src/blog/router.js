const express = require('express');
const router = require('express').Router();
const {
    validateBodyContent,
    postExist,
    validateBodyLength,
    commentExist,
} = require('./validator');
const {
    createPost,
    updatePost,
    getAllPosts,
    getPostById,
    deletePost,
} = require('./controllers/post.controller');
const {
    createComment,
    deleteComment,
    getAllComments,
} = require('./controllers/comment.controller');

router.use(express.json());

router.use((req, res, next) => {
    delete req.body.id;
    delete req.body.__v;
    next();
});

// Get all posts
router.get('/', getAllPosts);

// Create a new post
router.post('/', validateBodyContent, validateBodyLength, createPost);

// Delete a post
router.delete('/:id', postExist, deletePost);

// Get a single post
router.get('/:id', postExist, getPostById);

// Update a post
router.patch('/:id', postExist, validateBodyContent, validateBodyLength, updatePost);

// Delete a single comment for a post
router.delete('/comments/:id', commentExist, deleteComment);

// Get all comments for a post
router.get('/posts/:id/comments', postExist, getAllComments);

// Create a new comment for a post
router.post('/posts/:id/comments', postExist, createComment);

module.exports = router;
