const Post = require('./models/post');


const postExist = async (req, res, next) => {
    try {
        const post = await Post.findOne({ id: req.params.id }).lean().exec();

        if (!post) {
            return res.status(404).send('Post not found');
        }

        req.post = post;

        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const validateBody = (req, res, next) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).send('Title and body are required');
    }

    if (req.body.content.length < 10 || req.body.content.length > 200) {
        return res.status(400).send('Body must be between 10 and 200 characters');
    }

    next();
};

module.exports = {
    validateBody,
    postExist,
};