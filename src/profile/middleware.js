const Comment = require('../blog/models/comment');
const Post = require('../blog/models/post');

const deletePostsAndComments = async (req, res, next) => {
    try {
        await Post.deleteMany({ createdBy: req.params.id });
        await Comment.deleteMany({ createdBy: req.params.id });
    } catch (err) {
        return res.status(500).send(err.message);
    }

    next();
};

module.exports = { deletePostsAndComments };
