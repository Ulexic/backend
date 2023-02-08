const { uuid, jsonSchema } = require('uuidv4');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    id: {
        required: true,
        type: jsonSchema.v4.type,
        unique: true,
        default: "1",
    },
    post: {
        type: jsonSchema.v4.type,
    },
});


commentSchema.pre('save', function (next) {
    this.id = uuid();
    next();
});

module.exports = Content = mongoose.model('Comment', commentSchema);