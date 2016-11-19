(function () {
    // 'use strict';
    angular.module('registration')
        .service('registrationService', registrationService);

    function registrationService($http) {
        this.submitRegistration = function (user) {
            return $http.post('/api/users', user)
                .then(function (res) {
                    return res;
                });
        };

        this.loadCountries = function () {
            return $http.get('/api/countries')
                .then(function (res) {
                    return res.data;
                });
        };

        this.loadStates = function () {
            return $http.get('/api/states')
                .then(function (res) {
                    return res.data;
                });
        };

        this.getUserRoles = function () {
            return $http.get('/api/roles')
                .then(function (res) {
                    return res.data;
                });
        };

        this.getIndividualAccountTypes = function () {
            return $http.get('/api/individualaccounttypes')
                .then(function (res) {
                    return res.data;
                });
        };

        this.getLookingToTypes = function () {
            return $http.get('/api/lookingToTypes')
                .then(function (res) {
                    return res.data;
                });
        };

        this.getLanguages = function () {
            return $http.get('/api/languages')
                .then(function (res) {
                    return res.data;
                });
        };
    }
})();
