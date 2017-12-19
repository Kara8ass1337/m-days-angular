import angular from 'angular';
import uiRouter from 'angular-ui-router';

export const app = angular.module('app', [
    uiRouter
]);

app.run(($rootScope, popupActiveState) => {
    /**
     * навешиваем событие изменения состояния UI Router-а
     */
    $rootScope.$on('$stateChangeStart', (event, next, current) => {
        popupActiveState.set(false);
    });
});