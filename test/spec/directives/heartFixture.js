'use strict';

describe('Section Animation Directive heart-fixture', function () {	
	var element;
	var $scope;
	var $document;
	var $window;

	// load the controller's module
	beforeEach(module('gballgithubioApp'));

	// clean the mock after each test
	afterEach(function() {
		document.body.innerHTML = '';
		angular.element($window).unbind("scroll resize");
	});

	// initialize the controller and a mock scope prior to each test
	beforeEach(inject(function($rootScope, _$document_, _$window_, $compile) {
		$document = _$document_;
		$document.find('body').append(element);
		$window = _$window_;
		$window.innerWidth = 800;
		$scope = $rootScope.$new();
		$scope.scrollPosition = 300;
		element = angular.element('<img heart-fixture>');
		$compile(element)($scope);
		spyOn(document, 'getElementById').and.callFake(function() {
			return {
				offsetTop: 800,
				offsetHeight: 600
			};
		});
	}));
	
	// run tests
	it('should hide animation in mobile view', function() {
		$window.innerWidth = 300;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('hide-heart')).toBe(true);
		expect(element.hasClass('unfixed-image')).toBe(false);
		expect(element.hasClass('fixed-heart')).toBe(false);
	});
	
	it('should include unfixed-heart class in img element', function() {
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('hide-heart')).toBe(false);
		expect(element.hasClass('unfixed-heart')).toBe(true);
		expect(element.hasClass('fixed-heart')).toBe(false);
	});

	it('should include fixed-heart class in img element', function() {
		$scope.scrollPosition = 775;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('hide-heart')).toBe(false);
		expect(element.hasClass('unfixed-heart')).toBe(false);
		expect(element.hasClass('fixed-heart')).toBe(true);
	});
});
