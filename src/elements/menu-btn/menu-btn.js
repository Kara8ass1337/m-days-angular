import {app} from 'common/app/app.init';
import template from './menu-btn.html'
import './menu-btn.styl';
import {MenuBtnController} from './MenuBtnController';

app.component('menuBtn', {
    template,
    controller: ['$scope', 'activePopupElem', 'popupActiveState', MenuBtnController],
    controllerAs: 'vm'
});