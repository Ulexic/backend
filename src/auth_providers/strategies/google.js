const express = require('express');
const passport = require('passport');
const router = express.Router();
const Account = require('../../account/models/account');
const { removeFields } = require('../../utils/utils');

router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
    '/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/callback/success',
        failureRedirect: '/auth/google/callback/failure',
    }),
);

router.get('/callback/success', async (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/google/callback/failure');
    }

    let account;
    let status = 200;

    try {
        account = await Account.findOne({ email: req.user.email });
        if (!account) {
            account = new Account({
                email: req.user.email,
                provider: 'google',
            });

            await account.save();
            status = 201;
        }

        return res.status(status).json({
            account: removeFields(account),
            token: account.generateJwt(),
        });
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
});

router.get('/callback/failure', (req, res) => {
    return res.send('Failure');
});

module.exports = router;
