const Comment = require('../models/comment');
const { removeFields } = require('../../utils/utils');

const createComment = async (req, res) => {
    const comment = new Comment(req.body);
    comment.post = req.params.id;

    try {
        await comment.save();

        return res.status(201).json(removeFields(comment));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const deleteComment = (req, res, next) => {
    try {
        Comment.deleteOne({ id: req.params.id }).lean().exec();

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
    };
};

module.exports = {
    createComment,
    deleteComment,
    getAllComments
};