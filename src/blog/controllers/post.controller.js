const { getUrl } = require('../../utils/utils');
const { removeFields } = require('../../utils/utils');
const Comment = require('../models/comment');
const Post = require('../models/post');

const createPost = async (req, res) => {
    const post = new Post(req.body);

    try {
        await post.save();

        return res
            .header('Location', getUrl(req, post.id))
            .status(201)
            .json(removeFields(post));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const deletePost = async (req, res, next) => {
    try {
        await Post.deleteOne({ id: req.params.id });

        await Comment.deleteMany({ post: req.params.id });

        return res.status(204).end();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        let posts = await Post.findOne({});

        return res.status(200).json(removeFields(posts));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getPostById = async (req, res) => {
    return res.status(200).json(removeFields(req.post));
};

const updatePost = async (req, res) => {
    try {
        let post = await Post.findOneAndUpdate(
            { id: req.params.id },
            {
                ...req.body,
                updatedAt: Date.now(),
            },
        );

        return res.status(200).json(removeFields(post));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
};
