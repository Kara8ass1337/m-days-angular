import {app} from 'common/app/app.init';
import template from './popup.html'
import './popup.styl';
import {PopupController} from './PopupController';

app.component('popup', {
    template,
    controller: ['$scope', 'popupState', PopupController],
    controllerAs: 'vm'
});