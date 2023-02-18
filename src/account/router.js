const express = require('express');
const router = express.Router();

const { accountExists, deleteProfile } = require('./middleware');
const { authenticate } = require('../middlewares/authenticate');
const { deleteAccount, login, register } = require('./controllers/account_controller');
const account = require('./models/account');

router.post('/login', login);

router.post('/register', register);
router.get('/verify', authenticate, (req, res) => {
    return res.status(200).json({ id: req.account, email: req.email });
});
router.post('/forgot-password', (req, res) => {
    const { email, password } = req.body;

    try {
        return res.json('Forgot');
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/reset-password', (req, res) => {
    const { email, password } = req.body;

    try {
        return res.json('Reset password');
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/change-password', async (req, res) => {
    const { email, password } = req.body;

    try {
        return res.json('Change');
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete', authenticate, deleteProfile, deleteAccount);

module.exports = router;
