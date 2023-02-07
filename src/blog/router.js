const express = require('express');
const router = require('express').Router();
const db = require('../db');
const { validateBody, postExist } = require('./validator');
const { createPost, updatePost, getAllPosts, getPostById, deletePost } = require('./controllers/post.controller');

router.use(express.json());

router.use((req, res, next) => {
    delete req.body.id;
    delete req.body.__v;
    next();
});

db.connect();

// Delete a post
router.delete('/:id', postExist, deletePost);

// Get all posts
router.get('/', getAllPosts);

// Get a single post
router.get('/:id', postExist, getPostById);

// Update a post
router.patch('/:id', postExist, validateBody, updatePost);

// Create a new post
router.post('/', validateBody, createPost);

// Get all comments for a post
router.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(`Comments for post ${req.params.id}`);
});

// Delete a single comment for a post
router.delete('/comments/:id', (req, res, next) => {
    res.status(200).send(`Deleted comment ${req.params.id}`);
});

module.exports = router;