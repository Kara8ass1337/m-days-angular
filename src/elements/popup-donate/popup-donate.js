import {app} from 'common/app/app.init';
import template from './popup-donate.html'
import './popup-donate.styl';
import {PopupDonateController} from './PopupDonateController';

app.component('popupDonate', {
    template,
    controller: ['$scope', 'activePopupElem', PopupDonateController],
    controllerAs: 'vm'
});