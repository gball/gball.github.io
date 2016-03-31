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
  .directive('passionImagesFixture', ['$window', function ($window) {
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
  .directive('opacityScrollAnimation', ['$window', function ($window) {
    function link (scope, element) {
      angular.element($window).bind('scroll resize', function() {
        //go to mobile view for passion section
        if (window.innerWidth <= 700) {
          element.removeClass();
          element.addClass('opacity-5');
          return;
        }
        
        var browserHeight = window.innerHeight; 
        var elementHeight = element.prop('offsetHeight');
        var elementOffsetTop = element.prop('offsetTop');

        // opacity of element is adjusted based on postion of screen
        if (elementOffsetTop + elementHeight < scope.scrollPosition) {
          element.removeClass();
          element.addClass('opacity-0');
        } else if (elementOffsetTop + (elementHeight * 0.8) < scope.scrollPosition) {
          element.removeClass();
          element.addClass('opacity-1');
        } else if (elementOffsetTop + (elementHeight * 0.6) < scope.scrollPosition) {
          element.removeClass();
          element.addClass('opacity-2');
        } else if (elementOffsetTop + (elementHeight * 0.4) < scope.scrollPosition) {
          element.removeClass();
          element.addClass('opacity-3');
        } else if (elementOffsetTop + (elementHeight * 0.2) < scope.scrollPosition) {
          element.removeClass();
          element.addClass('opacity-4');
        } else if (elementOffsetTop - browserHeight > scope.scrollPosition) {
          element.removeClass();
          element.addClass('opacity-0');
        } else if (elementOffsetTop - browserHeight + (elementHeight * 0.2) > scope.scrollPosition) {
          element.removeClass();
          element.addClass('opacity-1');
        } else if (elementOffsetTop - browserHeight + (elementHeight * 0.4) > scope.scrollPosition) {
          element.removeClass();
          element.addClass('opacity-2');
        } else if (elementOffsetTop - browserHeight + (elementHeight * 0.6) > scope.scrollPosition) {
          element.removeClass();
          element.addClass('opacity-3');
        } else if (elementOffsetTop - browserHeight + (elementHeight * 0.8) > scope.scrollPosition) {
          element.removeClass();
          element.addClass('opacity-4');
        } else {
          element.removeClass();
          element.addClass('opacity-5');
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
  // graph animation occurs when graph appears near bottom of viewport 
  .directive('graphAnimation', ['$window', function ($window) {
    function link (scope, element) {
      angular.element($window).bind('scroll resize', function() {
        // no animation in mobile view
        if (window.innerWidth <= 700) {
          scope.options = {
            animate: {
              enabled: false
            },
            thickness: 4, 
            mode: 'gauge', 
            total: 100
          };
          return;
        }

        var browserHeight = window.innerHeight; 
        var elementHeight = element.prop('offsetHeight');
        var elementOffsetTop = element.prop('offsetTop');

        if (elementOffsetTop + elementHeight - browserHeight < scope.scrollPosition) {
          scope.options = {
            animate: {
              enabled: true
            },
            thickness: 4, 
            mode: 'gauge', 
            total: 100
          };  
        } else if (elementOffsetTop - browserHeight > scope.scrollPosition) {
          scope.options = {
            thickness: 0, 
            mode: 'gauge', 
            total: 100
          };
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
