

(function(){

	/* global angular */
	angular.module('landing')
		.controller('landingPageController', landingPageController);

	landingPageController.$inject = ['$location'];

	function landingPageController($location){
		var vm = this;

		vm.doPatientRegistration = function(){
            $location.path('/registration');
        };
	}
	

})();
