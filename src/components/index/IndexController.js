import {repeatDate} from './repeatDate';
import {twoDigitsAlways} from './twoDigitsAlways';

export class IndexController {
    constructor ($scope, $timeout, $interval, $http, popupActiveState) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.$http = $http;
        this.popupActiveState = popupActiveState;

        this.repeatDate = repeatDate();
        this.progressFull = this.repeatDate.progressFull;
        this.progressShort = this.repeatDate.progressShort;
        this.twoDigitsAlways = twoDigitsAlways;
        this.bg = '';
        this.bgNext = '';
        this.bgStyle = '';
        this.bgNextStyle = '';
        this.bgChanging = false;

        this.init();
        this.bgInit();
    }

    init () {
        this.$interval(() => {
            this.repeatDate = repeatDate();
            this.progressFull = this.repeatDate.progressFull;
            this.progressShort = this.repeatDate.progressShort;
        }, 100);
    }

    /**
     *
     * @param width {number}
     * @returns {number}
     */
    static getMaxWidth(width) {
        if (width < 640) return 640;
        else if (width >= 640 && width < 1280) return 640;
        else if (width >= 1280 && width < 1600) return 1280;
        else if (width >= 1600 && width < 1920) return 1600;
        else if (width >= 1920 && width < 2560) return 1920;
        else if (width >= 2560 && width < 3840) return 2560;
        else if (width >= 3840 && width < 5210) return 3840;
        else if (width >= 5210 && width < 7680) return 5210;
        else if (width >= 7680) return 7680;
        else return 1920;
    }

    static getMaxSide() {
        return Math.max(window.outerHeight, window.innerHeight, window.outerWidth, window.innerWidth);
    }

    async bgInit () {
        const maxSide = IndexController.getMaxSide();
        const screenWidth = IndexController.getMaxWidth(maxSide);

        function getData () {
            return this.$http.get(`${window.location.origin}/bg`, {
                params: {
                    screenWidth
                }
            });
        }

        const data = await getData.apply(this);
        const dataNext = await getData.apply(this);
        this.bg = data.data;
        this.bgNext = dataNext.data;

        async function changeBg () {
            this.bg = this.bgNext;
            const dataNext = await getData.apply(this);
            this.bgNext = dataNext.data;
            this.bgStyle = {'background-image': `url(img_bg/${this.bg})`};
            this.bgNextStyle = {'background-image': `url(img_bg/${this.bgNext})`};
        }

        changeBg.apply(this);

        this.$interval(() => {
            this.bgChanging = true;

            this.$timeout(() => {
                changeBg.apply(this).then(() => {
                    this.bgChanging = false;
                });
            }, 500);
        }, 12000);
    }
}