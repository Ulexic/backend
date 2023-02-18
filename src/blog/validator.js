const Post = require('./models/post');
const Comment = require('./models/comment');
const Profile = require('../profile/models/profile');
const {
    POST_NOT_FOUND,
    INVALID_BODY,
    INVALID_BODY_LENGTH,
    COMMENT_NOT_FOUND,
    UNDEFINED_CREATEDBY,
    UNAUTHORIZED,
} = require('../utils/responseMessages');

const commentExist = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({ id: req.params.id });
        if (!comment) {
            return res.status(404).send(COMMENT_NOT_FOUND);
        }

        req.comment = comment;
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    next();
};

const postExist = async (req, res, next) => {
    try {
        const post = await Post.findOne({ id: req.params.id });

        if (!post) {
            return res.status(404).send(POST_NOT_FOUND);
        }

        req.post = post;
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    next();
};

const validateBodyContent = (req, res, next) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).send(INVALID_BODY);
    }

    next();
};

const validateBodyLength = (req, res, next) => {
    if (req.body.content.length < 10 || req.body.content.length > 200) {
        return res.status(400).send(INVALID_BODY_LENGTH);
    }

    next();
};

const validateCreatedBy = async (req, res, next) => {
    if (!req.body.createdBy) {
        return res.status(400).send(UNDEFINED_CREATEDBY);
    }

    const profile = await Profile.findOne({ id: req.body.createdBy }).exec();

    console.log(profile);
    console.log(req.account);

    if (!profile || profile.owner !== req.account) {
        return res.status(401).send(UNAUTHORIZED);
    }

    next();
};

module.exports = {
    commentExist,
    validateBodyContent,
    validateBodyLength,
    postExist,
    validateCreatedBy,
};
