(function(){

	/* global angular */
	angular.module('registration')
	    .controller('registrationController', registrationController);

	function registrationController(registrationService, infoModalService, yearGenerator){
		var vm = this;

        vm.currentView = 'initialInfo';
        vm.loadingCountry = true;
        vm.agreedToToS = false;
        vm.selectAccountType = false;
        vm.birthYears = [];
        vm.roles = [];

        vm.newAccount = {
            accountTypes: []
        };

        //*** Declarations ***//
        vm.registerUser = registerUser;
        vm.countrySelected = countrySelected;
        vm.selectCountry = selectCountry;
        vm.selectSignupType = selectSignupType;
        vm.beginAccountRegistration = beginAccountRegistration;
        vm.clearRoleSelection = clearRoleSelection;
        vm.formValid = formValid;
        vm.startOver = startOver;

        activate();

        //*** Implementation ***//

        function activate(){
            registrationService.loadCountries()
                .then(function (data) {
                    vm.countries = data;
                    vm.loadingCountry = false;
                });

            registrationService.getUserRoles()
                .then(function (data) {
                    vm.roles = data;
                    vm.loadingRoles = false;
                });

            registrationService.getIndividualAccountTypes()
                .then(function (data) {
                    vm.accountTypes = data;
                });

            vm.birthYears = yearGenerator.generate4DigitYears(1920, 18);
        }

        function stringEmpty(str){
            return !!str;
        }

        function formValid (){
            return stringEmpty(vm.newAccount.country) &&
                stringEmpty(vm.newAccount.state) &&
                stringEmpty(vm.newAccount.role) &&
                vm.newAccount.accountTypes.length > 0;
        }

        function registerUser() {
            var birthDateString = vm.birthMonth + ' ' + vm.birthDay + ', ' + vm.birthYear;
            vm.newAccount.birthDate = new Date(birthDateString);

            registrationService.submitRegistration(vm.newAccount)
                .then(function(res){
                    infoModalService.showMessage('User Saved', 'New user has been saved');
                });
        }

         function countrySelected() {
            registrationService.loadStates()
                .then(function(data){
                    vm.states = data;
                });
        }

         function selectCountry() {
            vm.currentView = 'country';
        }

        function clearRoleSelection(){
            vm.selectAccountType = false;
            startOver();
        }

         function selectSignupType () {
            switch(vm.newAccount.role){
                case 'Individual':
                    vm.selectAccountType = true;
                    break;
                case 'Physician':
                    vm.currentView = 'physicianDetails';
                    break;
            }
        }

         function beginAccountRegistration(){
             vm.currentView = 'registrationDetails';
         }

         function startOver(){
             vm.currentView = 'initialInfo';
         }
	}

})();