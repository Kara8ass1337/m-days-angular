import {app} from 'common/app/app.init';
import template from './index.html'

app.component('index', {
    template,
    controller: ['$scope', '$filter', () => {}],
    controllerAs: 'vm'
});