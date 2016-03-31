'use strict';

describe('Section Animation Directive passion-images-fixture', function () {	
	var element;
	var $scope;
	var $document;
	var $window;

	beforeEach(module('gballgithubioApp'));

	afterEach(function() {
		document.body.innerHTML = '';
		angular.element($window).unbind("scroll resize");
	});

	beforeEach(inject(function($rootScope, _$document_, _$window_, $compile) {
		$window = _$window_;
		$window.innerWidth = 800;
		$document = _$document_;
		$document.find('body').append(element);
		$scope = $rootScope.$new();
		$scope.scrollPosition = 300;
		element = angular.element('<img passion-images-fixture>');
		$compile(element)($scope);
		spyOn(document, 'getElementById').and.callFake(function() {
			return {
				offsetTop: 800,
				offsetHeight: 600
			};
		});
	}));
	
	it('should hide animation in mobile view', function() {
		$window.innerWidth = 300;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('unfixed-image')).toBe(true);
		expect(element.hasClass('fixed-image')).toBe(false);
	});
	
	it('should include unfixed-heart class in img element', function() {
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('unfixed-image')).toBe(true);
		expect(element.hasClass('fixed-image')).toBe(false);
	});

	it('should include fixed-heart class in img element', function() {
		$scope.scrollPosition = 775;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('unfixed-image')).toBe(false);
		expect(element.hasClass('fixed-image')).toBe(true);
	});

	it('should include fixed-heart class in img element', function() {
		$scope.scrollPosition = 905;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('unfixed-image')).toBe(true);
		expect(element.hasClass('fixed-image')).toBe(false);
	});
});
