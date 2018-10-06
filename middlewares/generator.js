const addDate = (req, res, next) => {
    req.body.date = new Date().toISOString();
    next();
};

module.exports = addDate;
