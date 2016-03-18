'use strict';

angular.module('gballgithubioApp')
  // when menu icon is clicked, the navbar slide down or up
  .directive('menuClick', function () {      
    function link (scope, element) {
      element.bind('click', function() {
        if (angular.element(document.querySelector('#navbar')).hasClass('navbar-show')) {
          angular.element(document.querySelector('#navbar')).removeClass('navbar-show');
          angular.element(document.querySelector('#navbar')).addClass('navbar-hide');
        } else if (angular.element(document.querySelector('#navbar')).hasClass('navbar-hide')) {
          angular.element(document.querySelector('#navbar')).removeClass('navbar-hide');
          angular.element(document.querySelector('#navbar')).addClass('navbar-show');
        }
      });   
    }

    return {
      restrict: 'A',
      link: link
    };
  })

  // arrow fades in and out as you scroll down or up 
  .directive('arrowScroll', ['$window', function ($window) {      
    function link (scope) {
      angular.element($window).bind('scroll resize', function() {
        if (scope.scrollPosition > 100) {
          angular.element(document.querySelector('#arrow')).removeClass('fade-in');
          angular.element(document.querySelector('#arrow')).addClass('fade-out');
        } else if (scope.scrollPosition <= 100) {
          angular.element(document.querySelector('#arrow')).removeClass('fade-out');
          angular.element(document.querySelector('#arrow')).addClass('fade-in');
        }

        scope.scrollPosition = this.pageYOffset;
        scope.$apply();
      });     
    }

    return {
      restrict: 'A',
      link: link
    };
  }])
  
  // on scroll, updates the nav links state depending on current height of page
  .directive('navScrollUpdate', ['$window', function ($window) {
    function link (scope) {
      angular.element($window).bind('scroll resize', function() {
        var headerTop = document.getElementById('header-image').offsetTop;
        var headerBottom = document.getElementById('header-image').offsetHeight - 10;
        var aboutBottom = document.getElementById('section-about').offsetHeight - 10 + headerBottom;
        var educationBottom = document.getElementById('section-education').offsetHeight - 10 + aboutBottom;
        var experienceBottom = document.getElementById('section-experience').offsetHeight - 10 + educationBottom;
        var passionBottom = document.getElementById('section-passion').offsetHeight - 10 + experienceBottom;
        var abilitiesBottom = document.getElementById('section-abilities').offsetHeight + passionBottom;
        
        // if scroll doesnt reach the last section than adjust when to make active
        if(window.innerHeight > document.getElementById('section-contact').offsetHeight) {
          abilitiesBottom -= window.innerHeight;
        }        
        
        // determine where scroll position is in order to set appropriate nav item active
        if (headerTop <= scope.scrollPosition && scope.scrollPosition < headerBottom) {
          scope.isActive = 1;
        } else if (headerBottom <= scope.scrollPosition && scope.scrollPosition < aboutBottom) {
          scope.isActive = 2;
        } else if (aboutBottom <= scope.scrollPosition && scope.scrollPosition < educationBottom) {
          scope.isActive = 3;
        } else if (educationBottom <= scope.scrollPosition && scope.scrollPosition < experienceBottom) {
          scope.isActive = 4;
        } else if (experienceBottom <= scope.scrollPosition && scope.scrollPosition < passionBottom) {
          scope.isActive = 5;
        } else if (passionBottom <= scope.scrollPosition && scope.scrollPosition < abilitiesBottom) {
          scope.isActive = 6;
        } else if (abilitiesBottom <= scope.scrollPosition) {
          scope.isActive = 7;
        } 

        scope.scrollPosition = this.pageYOffset;
        scope.$apply();
      });
    }

    return {
      restrict: 'A',
      link: link
    };
  }]);
