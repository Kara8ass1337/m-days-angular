export function ProductController ($scope, $filter) {
    let vm = this;
    vm.reverse = false;

    vm.data = [
        {
            name: 'gem',
            price : 3.49
        },
        {
            name: 'emerald',
            price : 17.99
        },
        {
            name: 'ruby',
            price : 10.02
        }
    ];

    vm.sort = {
        price: {
            active: false,
            reverse: null
        },
        name: {
            active: false,
            reverse: null
        }
    };

    function getActive () {
        let result;

        Object.keys(vm.sort).forEach(function (key) {
            if (vm.sort[key].active === true) result = key;
        });

        return result;
    }

    function sortToggle (params = {}) {
        let key = params.key;

        Object.keys(vm.sort).forEach(function (keyCur) {
            vm.sort[keyCur].active = false;

            if (keyCur === key) {
                vm.sort[key].active = true;
            }
        });
    }

    vm.orderBy = function (params = {}) {
        let value = params.value;

        if (vm.sort[value].reverse === null || vm.sort[value].active === false) {
            vm.sort[value].reverse = false;
        } else {
            vm.sort[value].reverse = !vm.sort[value].reverse;
        }

        vm.data = $filter('orderBy')(vm.data, '+' + value, vm.sort[value].reverse);
        sortToggle({key: value});
    };

    vm.add = function (params = {}) {
        let i = params.index;

        vm.data[i].price++;

        let active = getActive();

        if (active === 'price') {
            vm.sort[active].reverse = !vm.sort[active].reverse;
            vm.orderBy({value: active});
        }
    };

    vm.data = $filter('limitTo')(vm.data, 3);
}