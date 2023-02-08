const Comment = require('../models/comment');
const { removeFields } = require('../../utils/utils');
const { uuid } = require('uuidv4');

const createComment = async (req, res) => {
    const comment = new Comment(req.body);
    comment.id = uuid();
    comment.post = req.post.id;

    req.post.commentsCount += 1;

    try {
        await comment.save();
        await req.post.save();

        return res.status(201).json(removeFields(comment));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const post = await Post.findOne({ id: req.comment.post });
        console.log(post);
        post.commentsCount -= 1;

        await Comment.deleteOne({ id: req.params.id }).lean().exec();
        await post.save();

        return res.status(204).end();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.id }).lean().exec();

        res.status(200).send(removeFields(comments));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createComment,
    deleteComment,
    getAllComments,
};