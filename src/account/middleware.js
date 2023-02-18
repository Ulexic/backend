const { Account } = require('./models/account');
const  Profile  = require('../profile/models/profile');
const  Post = require('../blog/models/post');
const  Comment  = require('../blog/models/comment');
const { ACCOUNT_NOT_FOUND } = require('../utils/responseMessages');

const deleteProfile = async (req, res, next) => {
    try {
        const profiles = await Profile.find({ owner: req.account }).exec();

        profiles.forEach(async profile => {
            await Post.deleteMany({ createdBy: profile.id });
            await Comment.deleteMany({ createdBy: profile.id });
            await Profile.deleteOne({ id: profile.id });
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    next();
};   

const accountExists = async (req, res, next) => {
    try {
        const account = await Account.findById(req.account.id).exec();

        if (!account) {
            return res.status(404).send(ACCOUNT_NOT_FOUND);
        }

        req.account = account;
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    next();
};

module.exports = {
    accountExists,
    deleteProfile,
};