
(function(){
    // 'use strict';

    angular.module('panacea.services')
        .service('yearGenerator', yearGenerator);

    function yearGenerator(){
        var svc = this;

        svc.generate4DigitYears = function(startAt, yearsFromToday){
            var year = new Date().getFullYear();
            var max = yearsFromToday || 0;

            var years = [];
            for(var index=startAt; index < (year - max); index++){
                years.push(index);
            }

            return years;
        };
    }
})();