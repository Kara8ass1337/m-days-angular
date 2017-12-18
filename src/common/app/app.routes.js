import {app} from './app.init';

app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/', '/index');
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('index', {
            name: 'index',
            url: '/index',
            template: '<index></index>'
        });

        $stateProvider.state('about', {
            name: 'about',
            url: '/about',
            template: '<about></about>'
        });
    }]);