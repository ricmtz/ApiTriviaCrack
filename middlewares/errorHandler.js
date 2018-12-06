const fs = require('fs');

const errorHandler = (err, req, res, next) => {
    if (req.file !== undefined) {
        fs.unlink(req.file.path, (error) => {
            if (error) throw error;
        });
    }
    if (err) {
        res.status(err.code || 409).send({ data: err });
    } else {
        res.status(500).send();
    }
};

module.exports = errorHandler;
