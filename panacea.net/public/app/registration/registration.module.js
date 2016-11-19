(function(){
    'use strict';

    angular.module('registration', ['ui.bootstrap', 'ngMessages', 'panacea.services', 'angularjs-dropdown-multiselect'])
        .run(function ($templateCache, $http) {
            $http.get('/app/validation/validationMessages.html')
                .then(function(response) {
                    $templateCache.put('error-messages', response.data);
                });
        });
})();
