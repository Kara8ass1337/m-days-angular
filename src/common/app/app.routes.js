import {app} from './app.init';

app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/product');
    $urlRouterProvider.otherwise('/product');

    $stateProvider.state('product', {
        name: 'product',
        url: '/product',
        template: '<product></product>'
    });
}]);