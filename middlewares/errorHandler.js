const errorHandler = (err, req, res, next) => {
    if (err) {
        res.status(err.code || 409).send({ data: err.message });
    } else {
        res.status(500).send();
    }
};

module.exports = errorHandler;
