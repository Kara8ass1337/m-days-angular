import angular from 'angular';
import uiRouter from 'angular-ui-router';

export const app = angular.module('app', [
    uiRouter
]);

/*app.run(($rootScope) => {
    $rootScope.activePopupElem = 'popup__menu';
});*/