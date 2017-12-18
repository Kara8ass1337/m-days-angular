import {app} from 'common/app/app.init';
import template from './about.html'
import './about.styl'

app.component('about', {
    template,
    controller: ['$scope', () => {}],
    controllerAs: 'vm'
});