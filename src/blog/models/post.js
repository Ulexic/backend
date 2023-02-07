const mongoose = require('mongoose');
const { uuid, jsonSchema } = require('uuidv4');

const postSchema = new mongoose.Schema({
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
        default: "1",
    },
    title: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
    },
});

postSchema.pre('save', function (next) {
    this.id = uuid();
    next();
});

module.exports = Post = mongoose.model('Post', postSchema);