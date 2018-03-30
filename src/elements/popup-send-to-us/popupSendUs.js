import {app} from 'common/app/app.init';
import template from './popup-send-us.html'
import './popup-send-us.styl';
import {PopupSendUsController} from './PopupSendUsController';

app.component('popupSendUs', {
    template,
    controller: ['$scope', '$http', 'popupActiveElem', PopupSendUsController],
    controllerAs: 'vm'
});