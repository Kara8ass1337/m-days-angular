const fs = require('fs');

const allFiles = [];

class Dir {
    constructor() {

    }

    /**
     *
     * @param path {string}
     * @returns {Promise<any>}
     */
    static checkExist(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }

    static ls(path) {
        return fs.readdirSync(path);
    }

    /**
     * recursive
     * @param path
     * @returns {Array}
     */
    static readDir (path) {
        const files = Dir.ls(path);

        files.forEach((fileCur) => {
            const fileCurFullPath = `${path}/${fileCur}`;
            const stats = fs.statSync(fileCurFullPath);

            if (stats.isFile()) {
                allFiles.push({
                    name: fileCur,
                    fullPath: fileCurFullPath
                });
            } else if (stats.isDirectory()) {
                Dir.readDir(fileCurFullPath);
            }
        });

        return allFiles;
    }
}

module.exports = Dir;