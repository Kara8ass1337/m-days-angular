import {app} from './app.init';

app.service('popupActiveElem', ['$rootScope',
    class {
        constructor($rootScope) {
            this.popupActiveElem = 'menu';
            this.$rootScope = $rootScope;
        }

        set(elem) {
            this.popupActiveElem = elem;
            this.$rootScope.$broadcast('popupActiveElemChange', this.popupActiveElem);
        };

        get() {
            return this.popupActiveElem;
        }
    }
]);

app.service('popupState', ['$rootScope',
    class {
        constructor($rootScope) {
            this.$rootScope = $rootScope;
            this.popupState = false;
        }

        set(state) {
            this.popupState = state;

            this.$rootScope.$broadcast('popupStateChange', this.popupState);
        };

        get() {
            return this.popupState;
        }
    }
]);