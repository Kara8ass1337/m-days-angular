export class MenuBtnController {
    constructor ($scope, popupActiveElem, popupState) {
        this.isActive = false;
        this.popupState = popupState;
        this.popupActiveElem = popupActiveElem;
    }

    toggleState () {
        this.isActive = !this.isActive;
        this.popupState.set(this.isActive);

        if (this.isActive === false) {
            this.popupActiveElem.set('menu');
        }
    }
}