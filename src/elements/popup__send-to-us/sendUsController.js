export class sendUsController {
    constructor($scope, $http, activePopupElem) {
        this.activePopupElem = activePopupElem;
        this.$http = $http;
        this.$scope = $scope;
        this.vm = this;
    }

    submit() {
        const files = this.vm.files;
        const attachments = [];

        Object.keys(files).forEach((key) => {
            attachments.push({
                filename: files[key].name,
                content: files[key]
            });
        });

        const data = {
            text: `Name: ${this.vm.name},
        Email: ${this.vm.email},
        Link: ${this.vm.link}`,
            attachments
        };

        //this.$http.post('/mail', data);
        //todo: заливаем файлы, отправляем их по почте, для заливки файлов использовать multer
    }
}