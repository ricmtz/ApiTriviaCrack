const fs = require('fs');

class File {
    changeFolder(req, res, next) {
        if (req.file !== undefined) {
            const newPath = `uploads/${req.file.filename}.${req.file.mimetype.split('/')[1]}`;
            let error;
            fs.rename(req.file.path, newPath, (err) => {
                if (err) {
                    error = err;
                }
            });
            if (error) {
                return next(new Error('Failed file upload'));
            }
            req.body.avatar = `${process.env.HOST}/${newPath}`;
            req.file.path = newPath;
        }
        return next();
    }

    createFolder(folder) {
        fs.exists(folder, (exists) => {
            if (!exists) {
                fs.mkdir(folder, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    }
}

module.exports = new File();
