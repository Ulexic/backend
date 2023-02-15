const Person = require('./models/person');
const Company = require('./models/company');
const Profile = require('./models/profile')
const { TOO_MANY_PROFILES, PROFILE_NOT_FOUND } = require('../utils/responseMessages');

const validateProfileNumber = async (req, res, next) => {
    const personProfile = await Person.find({ owner: req.account }).exec();
    const companyProfile = await Company.find({ owner: req.account }).exec();
    if (personProfile.length + companyProfile.length >= 5) {
        return res.status(400).json({ msg: TOO_MANY_PROFILES });
    }

    next();
};

const profileExists = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ id: req.params.id }).exec();

        if (!profile) {
            return res.status(404).json({ msg: PROFILE_NOT_FOUND });
        }

        req.profile = profile;
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

    next();
}

module.exports = {
    validateProfileNumber,
    profileExists
};
