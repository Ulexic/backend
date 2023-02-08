const Post = require('./models/post');
const Comment = require('./models/comment');
const {
    POST_NOT_FOUND,
    INVALID_BODY,
    INVALID_BODY_LENGTH,
    COMMENT_NOT_FOUND,
} = require('../utils/responseMessages');

const commentExist = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({ id: req.params.id });
        if (!comment) {
            return res.status(404).send(COMMENT_NOT_FOUND);
        }

        req.comment = comment;

        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const postExist = async (req, res, next) => {
    try {
        const post = await Post.findOne({ id: req.params.id });

        if (!post) {
            return res.status(404).send(POST_NOT_FOUND);
        }

        req.post = post;

        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
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

module.exports = {
    commentExist,
    validateBodyContent,
    validateBodyLength,
    postExist,
};
