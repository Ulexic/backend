const express = require('express');
const router = express.Router();

const { deleteProfile } = require('./middleware');
const { authenticate } = require('../middlewares/authenticate');
const { deleteAccount, login, register } = require('./controllers/account_controller');
const account = require('./models/account');

router.post('/login', login);

router.post('/register', register);

router.get('/verify', authenticate, (req, res) => {
    return res.status(200).json({ id: req.account, email: req.email });
});

router.delete('/delete', authenticate, deleteProfile, deleteAccount);

module.exports = router;
