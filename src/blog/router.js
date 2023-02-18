const express = require('express');
const router = require('express').Router();
const { validateBodyContent, postExist, validateBodyLength, commentExist, validateCreatedBy } = require('./validator');
const { createPost, updatePost, getAllPosts, getPostById, deletePost } = require('./controllers/post.controller');
const { createComment, deleteComment, getAllComments } = require('./controllers/comment.controller');

router.use(express.json());

router.use((req, res, next) => {
    delete req.body.id;
    delete req.body.__v;
    next();
});

// Get all posts
router.get('/posts', getAllPosts);

// Create a new post
router.post('/posts', validateBodyContent, validateBodyLength, validateCreatedBy, createPost);

// Delete a post
router.delete('/posts/:id', postExist, validateCreatedBy, deletePost);

// Get a single post
router.get('posts/:id', postExist, getPostById);

// Update a post
router.patch('/posts/:id', postExist, validateBodyContent, validateBodyLength, validateCreatedBy, updatePost);

// Delete a single comment for a post
router.delete('/comments/:id', commentExist, validateCreatedBy, deleteComment);

// Get all comments for a post
router.get('/posts/:id/comments', postExist, getAllComments);

// Create a new comment for a post
router.post('/posts/:id/comments', postExist, validateCreatedBy, createComment);

module.exports = router;
