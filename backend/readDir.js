//todo: make async
const fs = require('fs');

/**
 *
 * @param path
 * @returns {Promise<any>}
 */
function ls (path) {
    return fs.readdirSync(path);
}

const allFiles = [];

/**
 * recursive
 * @param path
 * @returns {Array}
 */
function readDir (path) {
    const files = ls(path);

    files.forEach((fileCur) => {
        const fileCurFullPath = `${path}/${fileCur}`;
        const stats = fs.statSync(fileCurFullPath);

        if (stats.isFile()) {
            allFiles.push({
                name: fileCur,
                fullPath: fileCurFullPath
            });
        } else if (stats.isDirectory()) {
            readDir(fileCurFullPath);
        }
    });

    return allFiles;
}

module.exports = readDir;