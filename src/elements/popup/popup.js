import {app} from 'common/app/app.init';
import template from './popup.html'
import './popup.styl';

app.component('popup', {
    template,
    bindings: {
        showPopup: '=',
        activeElem: '='
    },
    controller: ['$scope', '$filter', () => {}],
    controllerAs: 'vm'
});