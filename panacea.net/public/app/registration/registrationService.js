(function(){
    'use strict';
    angular.module('registration')
        .service('registrationService', registrationService);

    function registrationService($http){
        this.submitRegistration = function(user){
            return $http.post('/api/users', user)
                .then(function (res) {
                    return res;
                });
        };

        this.loadCountries = function () {
            return $http.get('/api/countries')
                .then(function(res){
                    return res.data;
                });
        };

        this.loadStates = function () {
            return $http.get('/api/states')
                .then(function(res){
                    return res.data;
                });
        };
    }
})();
