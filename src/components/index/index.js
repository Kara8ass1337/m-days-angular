import {app} from 'common/app/app.init';
import template from './index.html';
import './index.styl';
import {IndexController} from './IndexController';

app.component('index', {
    template,
    controller: ['$scope', '$timeout', '$interval', '$http', IndexController],
    controllerAs: 'vm'
});