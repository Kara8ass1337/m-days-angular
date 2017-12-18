export class MenuBtnController {
    constructor ($scope, activePopupElem, popupActiveState) {
        this.isActive = false;
        this.popupActiveState = popupActiveState;
        this.activePopupElem = activePopupElem;
    }

    toggleState () {
        this.isActive = !this.isActive;
        this.popupActiveState.set(this.isActive);

        if (this.isActive === false) {
            this.activePopupElem.set('menu');
        }
    }
}