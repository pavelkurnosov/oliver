
(function(){
    'use strict';

    angular.module('registration')
        .directive('listItemEditor', roleEditor);

    function roleEditor(){
        return {
            restrict: 'E',
            templateUrl: '/app/registration/directives/listItemEditor.view.html',
            scope:{
                headerText: '@',
                listItems: '=',
                targetField: '=',
                onItemSelected: '&',
                onGoBack: '&',
                singleSelect: '='
            },
            controller: function($scope, $timeout){
                function multiItemSelected(target){
                    if(target.hasClass('active')){
                        target.removeClass('active');
                        $scope.targetField.remove(target.attr('value'));
                    } else {
                        target.addClass("active");
                        $scope.targetField.push(target.attr('value'));
                    }
                }

                function singleItemSelected(target){
                    if($scope.listItems.length === 1){
                        target.removeClass('active');
                        $scope.targetField = null;
                        $scope.listItems = $scope.tempItems;

                        $timeout($scope.onGoBack, 1);
                    } else {
                        target.addClass("active");

                        var targetValue = target.attr('value');
                        $scope.targetField = targetValue;

                        var itemIndex = $scope.listItems.indexOf(targetValue);
                        var item = $scope.listItems[itemIndex];

                        $scope.tempItems = $scope.listItems;

                        $scope.listItems = [];
                        $scope.listItems = [item];

                        $timeout($scope.onItemSelected, 1);
                    }
                }

                $scope.listItemClicked = function($event) {
                    var target = $($event.currentTarget);

                    if($scope.singleSelect){
                        singleItemSelected(target);
                    } else {
                        multiItemSelected(target);
                    }
                };
            }
        };
    }
})();
