export class MenuBtnController {
    constructor ($scope, $filter) {
        this.isActive = false;
        this.activeElem = 'menu';
        this.showPopup = false;
    }

    toggleState () {
        this.isActive = !this.isActive;
        this.showPopup = this.isActive;

        if (this.isActive === false) {
            this.activeElem = 'menu';
        }
    }
}