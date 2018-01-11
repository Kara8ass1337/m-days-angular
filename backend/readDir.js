//todo: make async
const fs = require('fs');

/**
 *
 * @param path
 * @returns {Promise<any>}
 */
function readDir (path) {
    return fs.readdirSync(path);
}

const allFiles = [];

/**
 * R = recursive
 * @param path
 * @returns {Array}
 */
function readDirR (path) {
    const files = readDir(path);

    files.forEach((fileCur) => {
        const fileCurFullPath = `${path}/${fileCur}`;
        const stats = fs.statSync(fileCurFullPath);

        if (stats.isFile()) {
            allFiles.push({
                name: fileCur,
                fullPath: fileCurFullPath
            });
        } else if (stats.isDirectory()) {
            readDirR(fileCurFullPath);
        }
    });

    return allFiles;
}

module.exports = {
    readDir,
    readDirR
};

