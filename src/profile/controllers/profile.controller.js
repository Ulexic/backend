const Person = require('../models/person');
const Company = require('../models/company');
const Post = require('../../blog/models/post');
const Comment = require('../../blog/models/comment');
const { removeFields, getUrl } = require('../../utils/utils');
const Profile = require('../models/profile');
const {
    INVALID_KIND,
    PROFILE_NOT_FOUND,
    SERVER_ERROR,
} = require('../../utils/responseMessages');

const createProfile = async (req, res) => {
    const { kind, ...body } = req.body;

    try {
        let profile;

        switch (kind) {
            case 'person':
                profile = new Person({ ...body, owner: req.account });
                break;
            case 'company':
                profile = new Company({ ...body, owner: req.account });
                break;
            default:
                return res.status(400).json({ msg: INVALID_KIND });
        }
        await profile.save();

        return res
            .header('Location', getUrl(req, profile.id))
            .status(201)
            .json(removeFields(profile));
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ id: req.params.id }).exec();
        if (!profile) {
            return res.status(404).json({ msg: PROFILE_NOT_FOUND });
        }

        await profile.delete();

        return res.status(204).end();
    } catch (err) {
        return res.status(500).json({ error: SERVER_ERROR });
    }
};

const getProfileById = async (req, res) => {
    return res.status(200).json({ profile: removeFields(req.profile) });
};

const getProfileComments = async (req, res) => {
    try {
        const comments = await Comment.find({ createdBy: req.params.id });

        return res.status(200).json({ comments: comments });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getProfilePosts = async (req, res) => {
    try {
        const posts = await Post.find({ createdBy: req.params.id });
        return res.status(200).json({ posts: posts });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getProfiles = async (req, res) => {
    const profiles = await Profile.find({ owner: req.account }).select('-_id -__v');

    return res.json(profiles);
};

module.exports = {
    createProfile,
    deleteProfile,
    getProfileById,
    getProfileComments,
    getProfilePosts,
    getProfiles,
};
