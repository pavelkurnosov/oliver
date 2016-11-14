(function(angular) {
  'use strict';
angular.module('panacea', ['ngRoute', 'landing', 'registration', 'modals'])

	.controller('mainCtrl', function($scope, $route, $routeParams, $location) {
	   $scope.$route = $route;
	   $scope.$location = $location;
	   $scope.$routeParams = $routeParams;
	})
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'app/landing/landingPage.html',
			controller: 'landingPageController',
			controllerAs: 'vm'
		})
		.when('/registration', {
			templateUrl: 'app/registration/registration.html',
			controller: 'registrationController',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo:'/'});
	});


	// OPEN AND CLOSE SUBMENUS ON CLICK
    $('.has-dropdown').on('click', 'a', function(e){
        $('.has-dropdown').not( $(this).parent() ).children(".menu-dropdown").removeClass("show");
        $('.has-dropdown').children(".menu-dropdown").removeClass('show');
        $(this).next(".menu-dropdown").toggleClass("show");
        e.stopPropagation();
    });

    // HIDE SUBMENUS WHEN CLICKING ELSEWHERE
    $(document.body).on('click', function(){
        $('.has-dropdown').children(".menu-dropdown").removeClass('show');
    });

    // HANDLE THE MOBILE MENU
    var $collapser = $('.mobile_collapser');

    $collapser.on('click', function(){
        var window_height = $(window).height();
        $('.menu_container').toggleClass('collapsed').css( "height", window_height );
        $('.header, .head_panel, .main, footer').toggleClass('collapsed');
    });

    var $ex_close_menu     = $('span.close_menu');
        $ex_close_menu.on('click', function(){
          var window_height = $(window).height();
          $('.menu_container').toggleClass('collapsed').css( "height", window_height );
          $('.header, .head_panel, .main, footer').toggleClass('collapsed');
        });

    // CLOSE MENUS ON RESIZE
    // var widthhh = 0;
    // $(window).load(function(){  widthhh = jQuery(window).width();  });
    // $(window).resize(function(){
    //   if(widthhh != jQuery(window).width()){
    //     $('.collapsed').removeClass('collapsed');
    //     $('.menu_container').css( "height", "auto" );
    //     widthhh = jQuery(window).width();
    //   }
    // });

    //HOVER MENU FUNCTIONALITY
    //var myTimer = null;
    $('.hover-menu .has-dropdown').on(
        {
        mouseenter: function() {
            $(this).children('ul').addClass('show wait_for_photo_load');
            //if(myTimer != null){
            //    clearTimeout(myTimer);
            //}
        },
        mouseleave: function(){
            //myTimer = setTimeout(function() {
                $('.has-dropdown ul.show').removeClass('show wait_for_photo_load');
            //} , 100);
        }
    });

    var myTimer2 = null;
    $('.hover-menu .has-dropdown').on(
        {
        mouseenter: function() {
            $(this).children('ul').addClass('show');
            //if(myTimer2 != null){
            //    clearTimeout(myTimer2);
            //}
        },
        mouseleave: function(){
            //myTimer2 = setTimeout(function() {
                $('.sublihasdropdown ul.show').removeClass('show');
            //} , 100);
        }
    });

})(window.angular);