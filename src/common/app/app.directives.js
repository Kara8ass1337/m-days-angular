import {app} from './app.init';

app.directive('inputFile', () => {
    return {
        restrict: 'E',
        template: '<input type="file" />',
        replace: true,
        require: 'ngModel',
        link(scope, element, attr, ctrl) {
            element.on('change', () => {
                scope.$apply(() => {
                    element[0].multiple ? ctrl.$setViewValue(element[0].files) : ctrl.$setViewValue(element[0].files[0]);
                });
            });
        }
    }
});