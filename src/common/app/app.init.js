import angular from 'angular';
import uiRouter from 'angular-ui-router';

export const app = angular.module('app', [
    uiRouter
]);

app.run(($rootScope) => {
    $rootScope.activePopupElem = 'menu';
});

app.service('changeActivePopupElem', function () {
    this.activePopupElem = 'menu';
    this.set = (elem) => {
        this.activePopupElem = elem;
    };

    this.get = () => {
        return this.activePopupElem;
    }
});