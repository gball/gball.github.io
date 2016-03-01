'use strict';

angular.module('gballgithubioApp')
  // images slide in from left or right when viewer is scrolling close to html tag 
  .directive("slideInAnimation", ['$window', function ($window) {
    function link (scope, element) {
      angular.element($window).bind("scroll resize", function() {
        var height = window.innerHeight;
        var currentElement = element.find("img");

        if ((currentElement.context.offsetTop - (height / 1.5)) < scope.scrollPosition) {
          if (currentElement.context.className === "img-experience-left") {
            element.removeClass("img-experience-left");
            element.addClass("slide-in-left"); 
          }
          if (currentElement.context.className === "img-experience-right") {
            element.removeClass("img-experience-right");
            element.addClass("slide-in-right"); 
          }
        } 
        
        if ((currentElement.context.offsetTop - height) > scope.scrollPosition) {
          if (currentElement.context.className === "slide-in-left") {
            element.addClass("img-experience-left");
            element.removeClass("slide-in-left");
          }
          if (currentElement.context.className === "slide-in-right") {
            element.addClass("img-experience-right");
            element.removeClass("slide-in-right");
          }
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
