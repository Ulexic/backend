const router = require('express').Router();
const {
    getProfiles,
    createProfile,
    deleteProfile,
    getProfileById,
    getProfilePosts,
    getProfileComments,
} = require('./controllers/profile.controller');
const { validateProfileNumber, profileExists } = require('./validator');
const { deletePostsAndComments } = require('./middleware');

// GET PROFILES
router.get('/', getProfiles);

// CREATE PROFILE
router.post('/', validateProfileNumber, createProfile);

// DELETE PROFILE
router.delete('/:id', deletePostsAndComments, deleteProfile);

// GET PROFILE BY ID
router.get('/:id', profileExists, getProfileById);

// GET PROFILE POSTS
router.get('/:id/posts', profileExists, getProfilePosts);

// GET PROFILE COMMENTS
router.get('/:id/comments', profileExists, getProfileComments);

module.exports = router;
