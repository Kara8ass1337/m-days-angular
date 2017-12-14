import {app} from 'common/app/app.init';
import template from './index.html'
import './index.scss';

app.component('index', {
    template,
    controller: ['$scope', '$filter', ()=>{}],
    controllerAs: 'vm'
});