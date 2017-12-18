import {app} from './app.init';

app.filter('capitalize', () => {
    return function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});