const random = require('./randomInteger');
const readDir = require('./readDir');

module.exports = function (path) {
    return new Promise((resolve, reject) => {
        readDir(path).then((files) => {
            resolve(files[random(0, files.length - 1)]);
        }).catch((err) => {
            throw err;
        });
    });
};