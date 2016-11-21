(function () {
    // 'use strict';

    angular.module('profileManagement')
        .controller('profileManagementController', profileManagementController);

    function profileManagementController($scope, $routeParams, userService, registrationService, yearGenerator) {
        var vm = this;

        vm.id = $routeParams.id;
        vm.currentTab = 'About Me';
        vm.months = [{value: 1, name: 'Jan', days: 31},
            {value: 2, name: 'Feb', days: 28},
            {value: 3, name: 'Mar', days: 31},
            {value: 4, name: 'Apr', days: 30},
            {value: 5, name: 'May', days: 31},
            {value: 6, name: 'Jun', days: 30},
            {value: 7, name: 'Jul', days: 31},
            {value: 8, name: 'Aug', days: 31},
            {value: 9, name: 'Sep', days: 30},
            {value: 10, name: 'Oct', days: 31},
            {value: 11, name: 'Nov', days: 30},
            {value: 12, name: 'Dec', days: 31}];
        vm.birthYears = [];
        vm.monthDays = [];
        vm.currentUser = {
            lookingTos: [],
            accountTypes: [],
            languages: []
        };

        vm.lookingToTypes = [];
        vm.languages = [];

        vm.multiselectOptions = {
            showCheckAll: false,
            showUncheckAll: false,
            scrollable: true,
            scrollableHeight: '200px'
        };

        vm.selectedAccountTypes = [];

        //*** Declarations ***//
        vm.birthDateChanged = birthDateChanged;

        // activate();

        //*** Implementation ***//
        function activate() {
            $scope.$watch(vm.birthMonth, loadMonthDays);

            userService.getUser(vm.id)
                .then(function (user) {
                    vm.currentUser = user;
                    vm.birthMonth = user.birthDate.getMonth();
                    vm.birthDay = user.birthDate.getDay();
                    vm.birthYear = user.birthDate.getFullYear();

                    loadMonthDays();
                });

            registrationService.getUserRoles()
                .then(function (data) {
                    vm.roles = data;
                });

            registrationService.getLookingToTypes()
                .then(function (data) {
                    vm.lookingToTypes = data;
                });

            registrationService.getLanguages()
                .then(function (data) {
                    vm.languages = data;
                });

            registrationService.getIndividualAccountTypes()
                .then(function (data) {
                    vm.accountTypes = data;
                });

            vm.birthYears = yearGenerator.generate4DigitYears(1920, 18);
            vm.yearsGraduated = yearGenerator.generate4DigitYears(1947);
        }

        function loadMonthDays() {
            if (!vm.birthMonth) {
                return;
            }

            var month = vm.months.find(function (month) {
                return month.value == vm.birthMonth;
            });

            vm.monthDays = [];
            for (var index = 1; index <= month.days; index++) {
                vm.monthDays.push({value: index, name: index});
            }
        }

        function birthDateChanged() {
            if (vm.birthMonth && vm.birthDay && vm.birthYear) {
                vm.currentUser.birthDate = new Date(vm.birthMonth + '/' + vm.birthDay + '/' + vm.birthYear);
            }
        }

        //Model
        vm.currentStep = 1;
        vm.steps = [
            {name: "About Me", template: "about_me"},
            {name: "Contact Info", template: "contact_info"},
            {name: "Health Info", template: "health_info"},
            {name: "Photos", template: "photos"},
            {name: "Settings", template: "settings"}
        ];
        vm.user = {};
        vm.maxStep = vm.currentStep;
        vm.gotoStep = function (newStep) {
            if (newStep >= vm.maxStep) vm.maxStep = newStep;
            vm.currentStep = newStep;
        };

        vm.getStepTemplate = function () {
            return 'app/profileManagement/templates/' + vm.steps[vm.currentStep].template + '.html';
        };

        vm.save = function () {
            alert('Success!!!');
        };
    }
})();