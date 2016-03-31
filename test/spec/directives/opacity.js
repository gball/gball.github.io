'use strict';

describe('Section Animation Directive opacity-scroll-animation', function () {	
	var element;
	var $scope;
	var $window;

	// load the controller's module
	beforeEach(module('gballgithubioApp'));

	// clean the mock after each test
	afterEach(function() {
		angular.element($window).unbind("scroll resize");
	});

	// initialize the controller and a mock scope prior to each test
	beforeEach(inject(function($rootScope, _$window_, $compile) {
		$window = _$window_;
		$window.innerWidth = 800;
		$window.innerHeight = 800;
		element = angular.element('<div opacity-scroll-animation class="opacity-0"></div>');
		$scope = $rootScope.$new();
		$compile(element)($scope);
		spyOn(angular.element, 'prop').and.returnValue(200);
	}));
	
	// run tests
	it('should hide animation in mobile view', function() {
		$window.innerWidth = 300;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-5')).toBe(true);
		expect(element.hasClass('opacity-0')).toBe(false);
	});

	it('return element with opacity-0 class when leaving viewport', function() {
		$scope.scrollPosition = 450;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-0')).toBe(true);
	});

	it('return element with opacity-1 class when leaving viewport', function() {
		$scope.scrollPosition = 400;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-1')).toBe(true);
	});

	it('return element with opacity-2 class when leaving viewport', function() {
		$scope.scrollPosition = 350;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-2')).toBe(true);
	});

	it('return element with opacity-3 class when leaving viewport', function() {
		$scope.scrollPosition = 300;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-3')).toBe(true);
	});

	it('return element with opacity-4 class when leaving viewport', function() {
		$scope.scrollPosition = 250;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-4')).toBe(true);
	});

	it('return element with opacity-0 class when entering viewport', function() {
		$scope.scrollPosition = -700;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-0')).toBe(true);
	});

	it('return element with opacity-1 class when entering viewport', function() {
		$scope.scrollPosition = -600;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-1')).toBe(true);
	});

	it('return element with opacity-2 class when entering viewport', function() {
		$scope.scrollPosition = -550;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-2')).toBe(true);
	});

	it('return element with opacity-3 class when entering viewport', function() {
		$scope.scrollPosition = -500;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-3')).toBe(true);
	});

	it('return element with opacity-4 class when entering viewport', function() {
		$scope.scrollPosition = -450;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-4')).toBe(true);
	});

	it('return element with opacity-5 class when in viewport', function() {
		$scope.scrollPosition = 0;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('opacity-5')).toBe(true);
	});
});
