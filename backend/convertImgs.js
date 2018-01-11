const fs = require('fs');
const appRoot = require('app-root-path');
const gm = require('gm');
const readDir = require('./readDir');

const imgsPath = `${appRoot}/public/img_bg`;
const imgsDonePath = `${appRoot}/public/img_bg_done`;

/**
 *
 * @param imgPath {string}
 * @param param {string}
 * @returns {Promise<any>}
 */
function getInfo (imgPath, param) {
    return new Promise((resolve, reject) => {
        gm(imgPath)[param]((err, val) => {
            if (err) reject(err);

            resolve(val);
        });
    });
}

/**
 *
 * @param imgCur {string}
 * @returns {Promise<void>}
 */
async function convertImg (imgCur) {
    const imgPath = `${imgsPath}/${imgCur}`;
    const imgInfo = {};

    imgInfo.size = await getInfo(imgPath, 'size');
    imgInfo.format = await getInfo(imgPath, 'format');

    gm(imgPath).resize(600).write(`${imgsDonePath}/${imgCur}`, (err) => {
        if (err) throw err;

        return Promise.resolve();
    });
}

function convertImgs () {
    /**
     *
     * @type {Array}
     */
    const imgsList = readDir(imgsPath);

    const promisesArr = [];

    imgsList.forEach((imgCur) => {
        promisesArr.push(convertImg(imgCur.name));
    });

    Promise.all(promisesArr).then(() => {
        console.log('done');
    });
}

convertImgs();