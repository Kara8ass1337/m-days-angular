export class sendUsController {
    constructor ($scope, $http, activePopupElem) {
        this.activePopupElem = activePopupElem;
        this.$http = $http;
        this.$scope = $scope;
        this.vm = this;
    }

    submit () {
        const data = {
            name: this.vm.name,
            email: this.vm.email,
            msg: this.vm.msg,
            files: this.vm.files
        };

        console.log(data);

        this.$http.post('/mail', data);
    }
}