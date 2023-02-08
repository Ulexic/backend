const mongoose = require('mongoose');
const { uuid, jsonSchema } = require('uuidv4');

const postSchema = new mongoose.Schema({
    commentsCount: {
        type: Number,
        default: 0,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    id: {
        type: jsonSchema.v4.type,
        required: true,
        unique: true,
        default: '1',
    },
    title: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
    },
});

module.exports = Post = mongoose.model('Post', postSchema);
