import {app} from 'common/app/app.init';
import template from './progress-indicator.html'
import './progress-indicator.styl';
import {ProgressIndicatorController} from './ProgressIndicatorController';

app.component('progressIndicator', {
    template,
    controller: ['$scope', '$filter', '$interval', ProgressIndicatorController],
    controllerAs: 'vm'
});