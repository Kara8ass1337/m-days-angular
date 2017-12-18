export class MenuBtnController {
    constructor ($scope, changeActivePopupElem) {
        this.isActive = false;
        this.showPopup = false;
        this.changeActivePopupElem = changeActivePopupElem;
    }

    toggleState () {
        this.isActive = !this.isActive;
        this.showPopup = this.isActive;

        if (this.isActive === false) {
            this.changeActivePopupElem.set('menu');
        }
    }
}