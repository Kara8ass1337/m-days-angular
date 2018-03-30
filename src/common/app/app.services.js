import {app} from './app.init';

class PopupActiveElem {
    constructor ($rootScope) {
        this.popupActiveElem = 'menu';
        this.$rootScope = $rootScope;
    }

    set (elem) {
        this.popupActiveElem = elem;
        this.$rootScope.$broadcast('popupActiveElemChange', this.popupActiveElem);
    };

    get () {
        return this.popupActiveElem;
    }
}

app.factory('popupActiveElem', ['$rootScope', ($rootScope) => {
    return new PopupActiveElem($rootScope);
}]);

class PopupState {
    constructor ($rootScope) {
        this.$rootScope = $rootScope;
        this.popupState = false;
    }

    set (state) {
        this.popupState = state;

        this.$rootScope.$broadcast('popupStateChange', this.popupState);
    };

    get () {
        return this.popupState;
    }
}

app.factory('popupState', ['$rootScope', ($rootScope) => {
    return new PopupState($rootScope);
}]);