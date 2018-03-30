import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

export const app = angular.module('app', [
    uiRouter,
    ngAnimate
]);

app.run(($rootScope, $location, $state, popupState) => {
    /**
     * переадресуем, если есть параметр route
     */
    const route = $location.$$search.route;

    const allowRoutes = [
        'index',
        'about'
    ];

    if (route) {
        if (allowRoutes.indexOf(route) !== -1) {
            $state.go(route);
        } else {
            $state.go('index'); //todo: 404
        }
    }

    /**
     * навешиваем событие изменения состояния UI Router-а
     */
    $rootScope.$on('$stateChangeStart', (event, next, current) => {
        popupState.set(false);
    });
});