const mongoose = require('mongoose').default;

const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb://localhost:27017/blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connection successful');
    }).catch((err) => {
        console.error(err);
    });
};

module.exports = { connect };