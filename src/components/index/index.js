import {app} from 'common/app/app.init';
import template from './index.html'

app.component('index', {
    template,
    controller: ['$scope', () => {}],
    controllerAs: 'vm'
});