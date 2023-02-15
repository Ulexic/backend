const mongoose = require('mongoose');
const Profile = require('./profile');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
    },
});

module.exports = Profile.discriminator('company', companySchema);
