const express = require('express');
const router = require('express').Router();


// @body: {username: string, password: string}
router.post('/login', (req, res) => {
    res.send('Hello World!')
});

router.post('/register', (req, res) => {
    res.send('Hello World!')
});

module.exports = router;