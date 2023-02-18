const Comment = require('../models/comment');
const Post = require('../models/post');
const { removeFields, getPagedResults } = require('../../utils/utils');

const createComment = async (req, res) => {
    const comment = new Comment(req.body);
    comment.postId = req.post.id;

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
        const post = await Post.findOne({ id: req.comment.postId });
        post.commentsCount -= 1;

        await Comment.deleteOne({ id: req.params.id }).exec();
        await post.save();

        return res.status(204).end();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAllComments = async (req, res) => {
    const { page = 1, per_page = 10 } = req.query;
    try {
        const comments = await getPagedResults(Comment, per_page, page);

        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createComment,
    deleteComment,
    getAllComments,
};
