

(function(){

	/* global angular */
	angular.module('landing')
		.controller('landingPageController', landingPageController);

	function landingPageController($location, $uibModal){
		var vm = this;

		vm.doPatientRegistration = function(){
            $uibModal.open({
                templateUrl: '/app/registration/registration.html',
                controller: 'registrationController',
                controllerAs: 'vm'
            });
        };
	}
	

})();
