export class PopupDonateController {
    constructor ($scope, activePopupElem, donateInstructionState) {
        this.activePopupElem = activePopupElem;
        this.donateInstructionState = donateInstructionState;
    }

    toggleInstructionState () {
        this.donateInstructionState.set(!this.donateInstructionState.get());
    }
}