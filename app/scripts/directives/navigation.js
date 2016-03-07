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
      angular.element($window).bind("scroll resize", function() {
        var headerTop = document.getElementById('header-image').offsetTop;
        var headerBottom = document.getElementById('header-image').offsetHeight - 10;
        var aboutBottom = document.getElementById('section-about').offsetHeight - 10 + headerBottom;
        var educationBottom = document.getElementById('section-education').offsetHeight - 10 + aboutBottom;
        var experienceBottom = document.getElementById('section-experience').offsetHeight - 10 + educationBottom;
        var passionBottom = document.getElementById('section-passion').offsetHeight - 10 + experienceBottom;
        
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
