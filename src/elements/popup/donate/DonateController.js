export class DonateController {
    constructor ($scope, changeActivePopupElem) {
        this.changeActivePopupElem = changeActivePopupElem;
        this.instructionShow = false;
    }

    toggleInstruction () {
        this.instructionShow = !this.instructionShow;
    }
}