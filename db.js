const mongoose = require('mongoose').default;
const dotenv = require('dotenv');

const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Database connection successful');
        })
        .catch(err => {
            console.error(err);
        });
};

module.exports = { connect };
