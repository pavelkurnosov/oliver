(function(){
    'use strict';

    angular.module('modals')
        .service('infoModalService', infoModalService);

    function infoModalService($uibModal){
        var svc = this;

        svc.showMessage = function(title, message){
            $uibModal.open({
                templateUrl: 'app/modals/infoModal.html',
                controller: function($scope, $uibModalInstance){
                    var vm = this;

                    vm.modalTitle = title;
                    vm.modalBody = message;

                    vm.ok = function(){
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs: 'vm'
            });
        };
    }
})();