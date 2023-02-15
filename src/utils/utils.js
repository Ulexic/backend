removeFields = val => {
    if (val instanceof Array) {
        for (let i = 0; i < val.length; i++) {
            val[i] = val[i].toObject();
            delete val[i]._id;
            delete val[i].__v;
        }
        return val;
    }

    val = val.toObject();
    delete val._id;
    delete val.__v;
    return val;
};

function getUrl(req, extra) {
    let url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    if (!req.originalUrl.includes(extra)) {
        url = (url.endsWith('/') ? url : url + '/') + `${extra}`;
    }

    return url;
}

module.exports = { removeFields, getUrl };
