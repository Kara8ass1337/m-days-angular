export class MenuController {
    constructor ($scope, $filter) {
        this.isActive = false;
        this.showPopup = false;
    }

    toggleState () {
        this.isActive = !this.isActive;
        this.showPopup = this.isActive
    }
}