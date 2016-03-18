'use strict';

angular.module('gballgithubioApp')
  // images slide in from left or right when viewer is scrolling close to html tag 
  .directive('slideInAnimation', ['$window', function ($window) {
    function link (scope, element) {
      angular.element($window).bind('scroll resize', function() {
        // no animation for mobile view 
        if (window.innerWidth <= 500) {
          return;
        }

        var height = window.innerHeight;
        var currentElement = angular.element(element.find('img').context);

        if ((currentElement.context.offsetTop - (height / 1.5)) < scope.scrollPosition) {
          if (currentElement.hasClass('img-experience-left')) {
            element.removeClass('img-experience-left');
            element.addClass('slide-in-left'); 
          }
          if (currentElement.hasClass('img-experience-right')) {
            element.removeClass('img-experience-right');
            element.addClass('slide-in-right'); 
          }
        } 
        
        if ((currentElement.context.offsetTop - height) > scope.scrollPosition) {
          if (currentElement.hasClass('slide-in-left')) {
            element.addClass('img-experience-left');
            element.removeClass('slide-in-left');
          }
          if (currentElement.hasClass('slide-in-right')) {
            element.addClass('img-experience-right');
            element.removeClass('slide-in-right');
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
  }])
  // fix the position of the heart image at appropriate times
  .directive('heartFixture', ['$window', function ($window) {
    function link (scope, element) {
      angular.element($window).bind('scroll resize', function() {
        // passion section mobile view 
        if (window.innerWidth <= 700) {
          element.addClass('hide-heart');
          element.removeClass('unfixed-image fixed-heart');
          return;
        }

        // determine when to fix and unfix heart image
        var heightFix = document.getElementById('col-offset').offsetTop - (document.documentElement.clientHeight * 0.25);
        var totalSectionHeight = document.getElementById('section-passion').offsetHeight + document.getElementById('section-passion').offsetTop;
        
        // subtract 600 to adjust for heart image height(400) and for space below(200)
        if (heightFix < scope.scrollPosition && (totalSectionHeight - 600) > scope.scrollPosition) {
            angular.element('.unfixed-heart').css('margin-top', '0');
            element.addClass('fixed-heart');
            element.removeClass('unfixed-heart hide-heart');
        } else if (heightFix >= scope.scrollPosition) {
            angular.element('.unfixed-heart').css('margin-top', '0');
            element.addClass('unfixed-heart');
            element.removeClass('fixed-heart hide-heart');
        } else if ((totalSectionHeight - 600) <= scope.scrollPosition) {
            // adjust heart image to fix at bottom of passion section when scrolling down
            var heartTopMargin = document.getElementsByClassName('passion-order-image')[scope.passion.length-1].offsetTop;
            heartTopMargin -= document.getElementById('col-offset').offsetTop;
            angular.element('.unfixed-heart').css('margin-top', heartTopMargin + 'px');
            element.addClass('unfixed-heart');
            element.removeClass('fixed-heart hide-heart');
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
  // fix the passion images inside the heart at appropriate times
  .directive('passionFixture', ['$window', function ($window) {
    function link (scope, element) {
      angular.element($window).bind('scroll resize', function() {
        // mobile version for passion images in passion section
        if (window.innerWidth <= 700) {
          element.addClass('unfixed-image');
          element.removeClass('fixed-image');
          return;
        }

        var heightFix = document.getElementById('col-offset').offsetTop - (document.documentElement.clientHeight * 0.25);
        var totalSectionHeight = document.getElementById('section-passion').offsetHeight + document.getElementById('section-passion').offsetTop;

        // subtract 600 to adjust for heart image height(400) and for space below(200)
        if (heightFix < scope.scrollPosition && (totalSectionHeight - 600) > scope.scrollPosition) {
            element.addClass('fixed-image');
            element.removeClass('unfixed-image');
        } else if (heightFix >= scope.scrollPosition) {
            element.addClass('unfixed-image');
            element.removeClass('fixed-image');
        } else if ((totalSectionHeight - 600) <= scope.scrollPosition) {
            element.addClass('unfixed-image');
            element.removeClass('fixed-image');
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
  // passion section scroll viewing effect (opacity)
  .directive('opacity', ['$window', function ($window) {
    function link (scope, element) {
      angular.element($window).bind('scroll resize', function() {
        //go to mobile view for passion section
        if (window.innerWidth <= 700) {
          element.removeClass();
          element.addClass('entered');
          return;
        }

        var divTop = element.context.offsetTop;
        var browserHeight = window.innerHeight;   

        // at a certain height in the browser adjust the opacity
        if (divTop - (browserHeight * 1.0) >= scope.scrollPosition) {
            element.removeClass();
            element.addClass('enter-0');
        } else if (divTop - (browserHeight * 0.83) >= scope.scrollPosition) {
            element.removeClass(); 
            element.addClass('enter-1');
        } else if (divTop - (browserHeight * 0.73) >= scope.scrollPosition) {
            element.removeClass();
            element.addClass('enter-2');
        } else if (divTop - (browserHeight * 0.65) >= scope.scrollPosition) {
            element.removeClass();
            element.addClass('enter-3');
        } else if (divTop - (browserHeight * 0.5) >= scope.scrollPosition) {
            element.removeClass();
            element.addClass('enter-4');
        } else if (divTop - (browserHeight * 0.25) >= scope.scrollPosition) {
            element.removeClass();
            element.addClass('entered');
        } else if (divTop - (browserHeight * 0.15) >= scope.scrollPosition) {
            element.removeClass();
            element.addClass('enter-4');
        } else if (divTop - (browserHeight * 0.05) >= scope.scrollPosition) {
            element.removeClass();
            element.addClass('enter-3');
        } else if (divTop - (browserHeight * -0.15) >= scope.scrollPosition) {
            element.removeClass();
            element.addClass('enter-2');
        } else if (divTop - (browserHeight * -0.3) >= scope.scrollPosition) {
            element.removeClass();
            element.addClass('enter-1');
        } else if (divTop - (browserHeight * -0.4) >= scope.scrollPosition) {
            element.removeClass();
            element.addClass('enter-5');
        } else if (divTop - (browserHeight * -0.4) < scope.scrollPosition) {
            element.removeClass();
            element.addClass('enter-0');
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
