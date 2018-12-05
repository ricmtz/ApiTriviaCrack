const fs = require('fs');

class File {
    changeFolder(req, res, next){
        if (req.file !== undefined) {
            fs.rename(req.file.path, `uploads/${req.file.filename}`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        next();
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
