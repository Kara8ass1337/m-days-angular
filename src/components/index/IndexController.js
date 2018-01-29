import {dateForPrint} from 'common/helpers/dateForPrint';
import {repeatDate} from 'common/helpers/repeatDate';
import {twoDigitsAlways} from 'common/helpers/twoDigitsAlways';

export class IndexController {
    constructor ($scope, $timeout, $interval, $http) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.$http = $http;

        this.dateForPirnt = dateForPrint(new Date());
        this.repeatDate = repeatDate();
        this.progressFull = this.repeatDate.progressFull;
        this.progressShort = this.repeatDate.progressShort;
        this.twoDigitsAlways = twoDigitsAlways;
        this.bgArr = [];
        this.bg = '';
        this.bgNext = '';
        this.bgStyle = '';
        this.bgNextStyle = '';
        this.bgChanging = false;

        /**
         *
         * temp, for get virtual resolution of smart watch
         * todo: delete before production
         */
        /*const viewPortSize = IndexController.getViewportSize();

        alert(`width: ${viewPortSize.width}, height: ${viewPortSize.height}`);*/

        this.init();
        this.bgInit();
    }

    static getViewportSize () {
        return {
            width: window.outerWidth,
            height: window.outerHeight
        }
    }

    init () {
        this.$interval(() => {
            this.repeatDate = repeatDate();
            this.progressFull = this.repeatDate.progressFull;
            this.progressShort = this.repeatDate.progressShort;
        }, 100);
    }

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

    async bgInit () {
        const screenWidth = IndexController.getMaxWidth(window.outerWidth);

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