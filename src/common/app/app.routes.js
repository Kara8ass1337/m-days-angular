import {app} from './app.init';

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('index', {
            name: 'index',
            url: '/',
            template: '<index></index>'
        });

        $stateProvider.state('about', {
            name: 'about',
            url: '/about',
            template: '<about></about>'
        });
    }]);