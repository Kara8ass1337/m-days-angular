import {app} from './app.init';

app.service('donateInstructionState', function () {
    this.donateInstructionState = false;

    this.set = (state) => {
        this.donateInstructionState = state;
    };

    this.get = () => {
        return this.donateInstructionState;
    }
});

app.service('activePopupElem', ['donateInstructionState', function (donateInstructionState) {
    this.activePopupElem = 'menu';
    this.donateInstructionState = donateInstructionState;

    this.set = (elem) => {
        this.activePopupElem = elem;

        if (this.donateInstructionState.get() === true && this.activePopupElem !== 'donate') {
            this.donateInstructionState.set(false);
        }
    };

    this.get = () => {
        return this.activePopupElem;
    }
}]);

app.service('popupActiveState', ['donateInstructionState', function (donateInstructionState) {
    this.donateInstructionState = donateInstructionState;
    this.popupActiveState = false;

    this.set = (state) => {
        this.popupActiveState = state;

        if (this.donateInstructionState.get() === true && this.popupActiveState === false) {
            this.donateInstructionState.set(false);
        }
    };

    this.get = () => {
        return this.popupActiveState;
    }
}]);