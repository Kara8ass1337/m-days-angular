import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

export const app = angular.module('app', [
    require('angular-animate'),
    uiRouter,
    ngAnimate
]);

app.run(($rootScope, popupActiveState) => {
    /**
     * навешиваем событие изменения состояния UI Router-а
     */
    $rootScope.$on('$stateChangeStart', (event, next, current) => {
        popupActiveState.set(false);
    });
});