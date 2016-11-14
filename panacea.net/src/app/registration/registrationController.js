(function(){

	/* global angular */
	angular.module('registration')
	    .controller('registrationController', registrationController);

	function registrationController(registrationService, infoModalService){
		var vm = this;

        vm.currentView = 'country';
        vm.loadingCountry = true;
        vm.agreedToToS = false;

        registrationService.loadCountries()
            .then(function (data) {
                vm.countries = data;
                vm.loadingCountry = false;
            });

        vm.newAccount = {};

		vm.registerUser = function() {
            registrationService.submitRegistration(vm.newAccount)
                .then(function(res){
                    infoModalService.showMessage('User Saved', 'New user has been saved');
                });
        };

        vm.countrySelected = function () {
            registrationService.loadStates()
                .then(function(data){
                    vm.states = data;
                })
        };

        vm.enterPersonDetails = function(){
            vm.currentView = 'personDetails';
        }
	}

})();