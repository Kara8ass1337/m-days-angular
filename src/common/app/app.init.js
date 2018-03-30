import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

export const app = angular.module('app', [
    uiRouter,
    ngAnimate
]);

app.run(($rootScope, popupState) => {
    /**
     * навешиваем событие изменения состояния UI Router-а
     */
    $rootScope.$on('$stateChangeStart', (event, next, current) => {
        popupState.set(false);
    });
});