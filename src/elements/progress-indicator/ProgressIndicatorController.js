import {dateForPrint} from 'common/helpers/dateForPrint';
import {repeatDate} from 'common/helpers/repeatDate';
import {twoDigitsAlways} from 'common/helpers/twoDigitsAlways';

export class ProgressIndicatorController {
    constructor ($scope, $filter, $interval) {
        this.$scope = $scope;
        this.$filter = $filter;
        this.$interval = $interval;

        this.dateForPirnt = dateForPrint(new Date());
        this.repeatDate = repeatDate();
        this.progress = this.repeatDate.progress;
        this.twoDigitsAlways = twoDigitsAlways;

        this.init();
    }

    init () {
        this.timer = this.$interval(() => {
            this.repeatDate = repeatDate();
            this.progress = this.repeatDate.progress;
        }, 1000);
    }
}