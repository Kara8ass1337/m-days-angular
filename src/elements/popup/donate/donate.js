import {app} from 'common/app/app.init';
import template from './donate.html'
import './donate.styl';
import {DonateController} from './DonateController';

app.component('donate', {
    template,
    controller: ['$scope', 'activePopupElem', DonateController],
    controllerAs: 'vm'
});