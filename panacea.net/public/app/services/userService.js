(function(){
    // 'use strict';

    angular.module('panacea.services')
        .service('userService', userService);

    function userService($http) {
        var svc = this;

        svc.getUser = function(id){
            return $http.get('/api/users/' + id)
                .then(function(res){
                    return res.data;
                });
        };
    }
})();