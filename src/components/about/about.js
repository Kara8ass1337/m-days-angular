import {app} from 'common/app/app.init';
import template from './about.html'
import './about.styl'
import {AboutController} from './AboutController';

app.component('about', {
    template,
    controller: ['$scope', 'popupState', AboutController],
    controllerAs: 'vm'
});