import {app} from 'common/app/app.init';
import template from './send-us.html'
import './send-us.styl';
import {sendUsController} from './sendUsController';

app.component('sendUs', {
    template,
    controller: ['$scope', '$http', 'activePopupElem', sendUsController],
    controllerAs: 'vm'
});