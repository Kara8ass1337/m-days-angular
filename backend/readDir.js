const fs = require('fs');

module.exports = function (path) {
    return new Promise(((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) reject(err);

            resolve(files);
        });
    }));
};