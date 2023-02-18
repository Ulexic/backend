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

async function getPagedResults(type, per_page, page) {
    try {
        const res = await type
            .find({})
            .limit(per_page)
            .skip(per_page * (page - 1))
            .exec();

        const count = await type.countDocuments();
        const pages = Math.ceil(count / per_page);

        let results = {
            meta: {
                page,
                per_page,
                count,
                pages,
            },
            results: removeFields(res),
        };

        return results;
    } catch (err) {
        throw err;
    }
}

module.exports = { removeFields, getUrl, getPagedResults };
