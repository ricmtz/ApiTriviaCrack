const addDate = (req, res, next) => {
    req.body.date = new Date().toISOString();
    next();
};

const notFound = (req, res, next) => {
    res.status(404).send();
};

module.exports = { addDate, notFound };
