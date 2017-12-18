export class DonateController {
    constructor ($scope, activePopupElem) {
        this.activePopupElem = activePopupElem;
        this.instructionShow = false;
    }

    toggleInstruction () {
        this.instructionShow = !this.instructionShow;
    }
}