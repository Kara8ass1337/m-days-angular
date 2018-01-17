const appRoot = require('app-root-path');
const gm = require('gm');
const Img = require('./Img');
const Dir = require('./Dir');
const randomString = require('./randomString');

class ConvertImgs {
    /**
     *
     * @param imgsPath {string}
     * @param imgsDonePath {string}
     */
    constructor({imgsPath, imgsDonePath} = {}) {
        this.imgsPath = imgsPath;
        this.imgsDonePath = imgsDonePath;
        this.widthArr = [
            640,
            1280,
            1600,
            1920,
            2560,
            3840,
            5210,
            7680
        ];
    }

    /**
     * @private
     * @param img {object}
     * @param img.fullPath {string}
     * @returns {Promise<void>}
     */
    async prepareToConvert(img) {
        const info = {};
        const newSize = [];

        info.size = await Img.getInfo(img.fullPath, 'size');
        info.format = await Img.getInfo(img.fullPath, 'format');

        const width = info.size.width;

        if (width < 640) return;

        const maxWidth = ConvertImgs.getMaxWidth(width);

        this.widthArr.forEach((widthCur) => {
            if (maxWidth >= widthCur) newSize.push(widthCur);
        });

        return this.convert({
            img,
            size: newSize
        });
    }

    /**
     * @private
     * @param width {number}
     */
    static getMaxWidth(width) {
        if (width >= 640 && width < 1280) return 640;
        else if (width >= 1280 && width < 1600) return 1280;
        else if (width >= 1600 && width < 1920) return 1600;
        else if (width >= 1920 && width < 2560) return 1920;
        else if (width >= 2560 && width < 3840) return 2560;
        else if (width >= 3840 && width < 5210) return 3840;
        else if (width >= 5210 && width < 7680) return 5210;
        else if (width >= 7680) return 7680;
    }

    /**
     * @private
     * @param img {object}
     * @param img.fullPath {string}
     * @param img.ext {string}
     * @param size[] {string}
     * @returns {Promise<[any]>}
     */
    convert({img, size} = {}) {
        const newName = randomString();
        const promisesArr = [];

        size.forEach((sizeCur) => {
            const imgCurDoneDir = `${this.imgsDonePath}/${sizeCur}`;

            Dir.checkExist(imgCurDoneDir);

            promisesArr.push(
                gm(img.fullPath).resize(sizeCur).write(`${imgCurDoneDir}/${newName}.${img.ext}`, (err) => {
                    if (err) throw err;

                    return Promise.resolve();
                })
            );
        });

        return Promise.all(promisesArr);
    }

    async start() {
        const imgsList = Dir.readDir(this.imgsPath);

        const promisesArr = [];

        imgsList.forEach((imgCur) => {
            promisesArr.push(this.prepareToConvert(imgCur));
        });

        await Promise.all(promisesArr);

        console.log('done');
    }
}

const convert = new ConvertImgs({
    imgsPath: `${appRoot}/public/img_bg`,
    imgsDonePath: `${appRoot}/public/img_bg_done`
});

convert.start();