removeFields = (post) => {
    delete post._id;
    delete post.__v;
    return post;
};

module.exports = { removeFields };