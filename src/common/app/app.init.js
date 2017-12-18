import angular from 'angular';
import uiRouter from 'angular-ui-router';

export const app = angular.module('app', [
    uiRouter
]);

app.run(($rootScope) => {
    $rootScope.activePopupElem = 'menu';
});

app.service('activePopupElem', function () {
    this.activePopupElem = 'menu';
    this.set = (elem) => {
        this.activePopupElem = elem;
    };

    this.get = () => {
        return this.activePopupElem;
    }
});

app.service('popupActiveState', function () {
    this.popupActiveState = false;

    this.set = (state) => {
        this.popupActiveState = state;
    };

    this.get = () => {
        return this.popupActiveState;
    }
});