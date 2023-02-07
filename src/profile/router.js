const express = require('express');
const router = require('express').Router();

// GET ALL POSTS
router.get('/:id', (req, res) => {
    res.send('Hello World!')

});

module.exports = router;