import {app} from 'common/app/app.init';
import {ProductController} from './product.controller';
import template from './product.html'
import './product.styl';

app.component('product', {
        template,
        controller: ['$scope', '$filter', ProductController],
        controllerAs: 'vm'
    });