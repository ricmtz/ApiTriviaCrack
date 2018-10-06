const errorHandler = (err, req, res, next) => {
    if (err) {
        res.status(409).send(err);
    } else {
        res.status(500).send();
    }
};

module.exports = errorHandler;
