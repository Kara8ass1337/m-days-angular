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

    async bgInit () {
        const data = await this.$http.get('http://localhost:8000/bg');
        this.bgArr = data.data;
        const bgArrayLength = (this.bgArr.length - 1);
        this.bg = this.bgArr[Math.floor(Math.random() * (bgArrayLength + 1))];
        this.bgNext = this.bgArr[Math.floor(Math.random() * (bgArrayLength + 1))];

        function changeBg () {
            this.bg = this.bgNext;
            this.bgNext = this.bgArr[Math.floor(Math.random() * (bgArrayLength + 1))];
            this.bgStyle = {'background-image': `url(img_bg/${this.bg})`};
            this.bgNextStyle = {'background-image': `url(img_bg/${this.bgNext})`};
        }

        changeBg.apply(this);

        this.$interval(() => {
            this.bgChanging = true;

            this.$timeout(() => {
                changeBg.apply(this);
                this.bgChanging = false;
            }, 500);
        }, 12000);
    }
}