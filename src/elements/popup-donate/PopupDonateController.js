export class PopupDonateController {
    constructor ($scope, popupActiveElem) {
        this.$scope = $scope;
        this.popupActiveElem = popupActiveElem;
        this.donateInstructionState = false;

        this.events();
    }

    toggleInstructionState () {
        this.donateInstructionState = !this.donateInstructionState;
    }

    events() {
        this.$scope.$on('popupStateChange', (event, current, prev) => {
            if (current === false) {
                this.donateInstructionState = false;
            }
        });

        this.$scope.$on('popupActiveElemChange', (event, current, prev) => {
            if (current !== 'donate') {
                this.donateInstructionState = false;
            }
        });
    }
}