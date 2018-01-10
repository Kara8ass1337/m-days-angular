const random = require('./randomInteger');
const readDir = require('./readDir');

let oldFile;

/**
 *
 * @param path
 * @returns {Promise<any>}
 */
module.exports = function (path) {
    return new Promise((resolve, reject) => {
        function randomFile () {
            readDir(path).then((files) => {
                const file = files[random(0, files.length - 1)];

                if (file === oldFile) {
                    randomFile();
                } else {
                    oldFile = file;
                    resolve(file);
                }
            }).catch((err) => {
                throw err;
            });
        }

        randomFile();
    });
};