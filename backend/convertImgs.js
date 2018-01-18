const appRoot = require('app-root-path');
const fs = require('fs-extra');
const gm = require('gm');
const Img = require('./Img');
const Dir = require('./Dir');
const File = require('./File');
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
     * @returns {Promise}
     */
    async prepareToConvert(img) {
        const info = {};
        const newSize = [];

        info.size = await Img.getInfo(img.fullPath, 'size');
        info.format = await Img.getInfo(img.fullPath, 'format');

        const width = info.size.width;
        const height = info.size.height;
        const delta = (width / height);

        if (width < 640) {
            console.log(`${img.fullPath} is too small, skipped;`);
            return;
        }

        if (delta < 1 || delta > 2) {
            const tryToSquareResult = await ConvertImgs.tryToSquare({
                img,
                size: info.size
            });

            console.log(`${img.fullPath} is not valid due size;`);

            if (tryToSquareResult !== false) {
                img = tryToSquareResult;

                console.log(`${img.fullPath} was cropped to square;`);
            }
        }

        const maxWidth = ConvertImgs.getMaxWidth(width);

        this.widthArr.forEach((widthCur) => {
            if (maxWidth >= widthCur) newSize.push(widthCur);
        });

        return await this.convert({
            img,
            size: newSize
        });
    }

    /**
     *
     * @param img {object}
     * @param img.fullPath {string}
     * @param img.nameWithoutExt {string}
     * @param size {object}
     * @returns {Promise}
     */
    static tryToSquare({img, size} = {}) {
        const cropVal = size.height < size.width ? size.height : size.width;

        return new Promise(((resolve, reject) => {
            gm(img.fullPath).gravity('Center').crop(cropVal, cropVal)
                .write(img.fullPath, async (err) => {
                    if (err) throw err;

                    const size = await Img.getInfo(img.fullPath, 'size');

                    if (size.width < 640) {
                        resolve(false);
                    } else {
                        resolve(File.getInfo(img.fullPath));
                    }
                });
        }));
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
     * @param img.name {string}
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
                gm(img.fullPath).channel('gray').resize(sizeCur).quality(75)
                    .write(`${imgCurDoneDir}/${newName}.jpg`, (err) => {
                        if (err) throw err;

                        console.log(`${img.name} converted to ${sizeCur}/${newName}.jpg`);

                        return Promise.resolve();
                    })
            );
        });

        return Promise.all(promisesArr);
    }

    async start() {
        /**
         * empty folder before convert.
         * it's need because of random name for
         * each new converted image.
         * so if not empty there will many duplicate
         */
        try {
            await fs.emptyDir(this.imgsDonePath);
            console.log(`${this.imgsDonePath} is now empty;`);
        } catch (err) {
            throw err;
        }

        const imgsList = Dir.readDir(this.imgsPath);

        const promisesArr = [];

        imgsList.forEach((imgCur) => {
            promisesArr.push(this.prepareToConvert(imgCur));
        });

        await Promise.all(promisesArr);

        //todo: promises do not correctly, fix it

        console.log('done');
    }
}

const convert = new ConvertImgs({
    imgsPath: `${appRoot}/public/img_bg_sources`,
    imgsDonePath: `${appRoot}/public/img_bg`
});

convert.start();