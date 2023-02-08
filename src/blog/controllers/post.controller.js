const { updateOne } = require('../models/post');
const Post = require('../models/post');
const { removeFields } = require('../../utils/utils');
const { uuid } = require('uuidv4');

const createPost = async (req, res) => {
    const post = new Post(req.body);
    post.id = uuid();

    try {
        await post.save();

        return res
            .header('Location', `http://localhost:4000/blog/${post.id}`)
            .status(201)
            .json(removeFields(post));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const deletePost = async (req, res, next) => {
    try {
        await Post.deleteOne({ id: req.params.id }).lean().exec();

        await Comment.deleteMany({ post: req.params.id }).lean().exec();

        return res.status(204).end();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).lean().exec();

        res.status(200).send(removeFields(posts));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getPostById = async (req, res) => {
    return res.status(200).send(removeFields(req.post));
};

const updatePost = async (req, res) => {
    try {
        await Post.updateOne(
            { id: req.params.id },
            {
                ...req.body,
                updatedAt: Date.now(),
            }
        )
            .lean()
            .exec();

        return res.status(200).send(removeFields(req.post));
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
