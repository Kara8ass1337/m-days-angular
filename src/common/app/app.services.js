import {app} from './app.init';

class ActivePopupElem {
    constructor ($rootScope) {
        this.activePopupElem = 'menu';
        this.$rootScope = $rootScope;
    }

    set (elem) {
        this.activePopupElem = elem;
        this.$rootScope.$broadcast('popupActiveElemChange', this.activePopupElem);
    };

    get () {
        return this.activePopupElem;
    }
}

app.factory('activePopupElem', ['$rootScope', ($rootScope) => {
    return new ActivePopupElem($rootScope);
}]);

class PopupActiveState {
    constructor ($rootScope) {
        this.$rootScope = $rootScope;
        this.popupActiveState = false;
    }

    set (state) {
        this.popupActiveState = state;

        this.$rootScope.$broadcast('popupStateChange', this.popupActiveState);
    };

    get () {
        return this.popupActiveState;
    }
}

app.factory('popupActiveState', ['$rootScope', ($rootScope) => {
    return new PopupActiveState($rootScope);
}]);