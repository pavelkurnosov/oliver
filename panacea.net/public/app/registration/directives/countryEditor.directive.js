
(function(){
    'use strict';

    angular.module('registration')
        .directive('countryEditor', countryEditor);

    function countryEditor(){
        return {
            restrict: 'E',
            templateUrl: 'app/registration/directives/countryEditor.view.html'
        };
    }
})();