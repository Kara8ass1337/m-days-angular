import {app} from './app.init';

class DonateInstructionState {
    constructor () {
        this.donateInstructionState = false;
    }

    set (state) {
        this.donateInstructionState = state;
    };

    get () {
        return this.donateInstructionState;
    }
}

app.factory('donateInstructionState', () => {
    return new DonateInstructionState();
});

class ActivePopupElem {
    constructor (donateInstructionState) {
        this.activePopupElem = 'menu';
        this.donateInstructionState = donateInstructionState;
    }

    set (elem) {
        this.activePopupElem = elem;

        if (this.donateInstructionState.get() === true && this.activePopupElem !== 'donate') {
            this.donateInstructionState.set(false);
        }
    };

    get () {
        return this.activePopupElem;
    }
}

app.factory('activePopupElem', ['donateInstructionState', (donateInstructionState) => {
    return new ActivePopupElem(donateInstructionState);
}]);

class PopupActiveState {
    constructor (donateInstructionState) {
        this.donateInstructionState = donateInstructionState;
        this.popupActiveState = false;
    }

    set (state) {
        this.popupActiveState = state;

        const body = document.getElementsByTagName('body')[0];
        //todo: wrap all to another one wrapper with width 100% and height 100vh

        if (this.popupActiveState === true) {
            body.classList.add('popup-active');
        } else {
            body.classList.remove('popup-active');

            if (this.donateInstructionState.get() === true) {
                this.donateInstructionState.set(false);
            }
        }
    };

    get () {
        return this.popupActiveState;
    }
}

app.factory('popupActiveState', ['donateInstructionState', (donateInstructionState) => {
    return new PopupActiveState(donateInstructionState);
}]);