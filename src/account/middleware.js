const Profile = require('../profile/models/profile');
const Post = require('../blog/models/post');
const Comment = require('../blog/models/comment');

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

module.exports = {
    deleteProfile,
};
