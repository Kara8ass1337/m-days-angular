export class MenuController {
    constructor ($scope, $filter) {
        this.isActive = false;
        this.toggleClass = () => {
            this.isActive = !this.isActive;
        }
    }
}