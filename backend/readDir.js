const fs = require('fs');

/**
 *
 * @param path
 * @returns {Promise<any>}
 */
module.exports = function (path) {
    return new Promise(((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) reject(err);

            resolve(files);
        });
    }));
};