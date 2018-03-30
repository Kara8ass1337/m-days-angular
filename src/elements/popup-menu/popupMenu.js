import {app} from 'common/app/app.init';
import template from './popup-menu.html'
import './popup-menu.styl';
import {PopupMenuController} from './PopupMenuController';

app.component('popupMenu', {
    template,
    controller: ['$scope', '$location', 'popupActiveElem', PopupMenuController],
    controllerAs: 'vm'
});