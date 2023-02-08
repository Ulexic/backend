removeFields = val => {
    if (val) {
        delete val._id;
        delete val.__v;
    }

    if (val instanceof Array) {
        for (let i = 0; i < val.length; i++) {
            delete val[i]._id;
            delete val[i].__v;
        }
    }

    return val;
};

module.exports = { removeFields };
