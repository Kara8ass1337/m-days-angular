import {app} from 'common/app/app.init';
import template from './send-to-us.html'
import './send-to-us.styl';
import {SendToUsController} from './sendToUsController';

app.component('sendToUs', {
    template,
    bindings: {
        onToggleState: '&',
        activeElem: '='
    },
    controller: ['$scope', '$filter', SendToUsController],
    controllerAs: 'vm'
});