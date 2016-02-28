'use strict';

angular.module('gballgithubioApp')
  // once nav item is clicked, changes from inactive to active state
  .directive('navClick', function () {      
    function link (element) {
      angular.element.bind("click", function() {
        element.parent().parent().find("a").removeClass("active");
        element.addClass("active");
      });     
    }

    return {
      restrict: 'A',
      link: link
    };
  })
  // on scroll, updates the nav links state depending on current height of page
  .directive("navScrollUpdate", ['$window', function ($window) {
    function link (scope) {
      angular.element($window).bind("scroll", function() {
        var headerTop = document.getElementById('header-image').offsetTop;
        var headerBottom = document.getElementById('header-image').offsetHeight - 10;
        var aboutBottom = document.getElementById('section-about').offsetHeight - 10 + headerBottom;
        var educationBottom = document.getElementById('section-education').offsetHeight + aboutBottom;

        if (headerTop <= scope.scrollPosition && scope.scrollPosition < headerBottom) {
          scope.isActive = 1;
        } else if (headerBottom <= scope.scrollPosition && scope.scrollPosition < aboutBottom) {
          scope.isActive = 2;
        } else if (aboutBottom <= scope.scrollPosition && scope.scrollPosition < educationBottom ) {
          scope.isActive = 3;
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
