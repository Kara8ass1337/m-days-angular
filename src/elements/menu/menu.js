import {app} from 'common/app/app.init';
import template from './menu.html'
import './menu.styl';
import {MenuController} from './MenuController';

app.component('menu', {
    template,
    bindings: {
        onToggleState: '&',
        showPopup: '='
    },
    controller: ['$scope', '$filter', MenuController],
    controllerAs: 'vm'
});