
(function(){
    'use strict';

    angular.module('registration')
        .directive('personDetails', personDetails);

    function personDetails(){
        return {
            restrict: 'E',
            templateUrl: 'app/registration/directives/personDetails.view.html'
        };
    }
})();