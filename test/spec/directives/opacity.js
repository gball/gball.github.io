'use strict';

describe('Section Animation Directive opactiy', function () {	
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
		$window = _$window_;
		$window.innerWidth = 800;
		$window.innerHeight = 500;
		$document = _$document_;
		$document.find('body').append(element);
		element = angular.element('<div opacity class="enter-0">');
		$scope = $rootScope.$new();
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
		expect(element.hasClass('entered')).toBe(true);
		expect(element.hasClass('enter-0')).toBe(false);
	});

	it('return element with enter-0 class', function() {
		$scope.scrollPosition = -805;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('enter-0')).toBe(true);
	});

	it('return element with enter-1 class', function() {
		$scope.scrollPosition = -445;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('enter-1')).toBe(true);
	});

	it('return element with enter-2 class', function() {
		$scope.scrollPosition = -400;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('enter-2')).toBe(true);
	});

	it('return element with enter-3 class', function() {
		$scope.scrollPosition = -350;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('enter-3')).toBe(true);
	});

	it('return element with enter-4 class', function() {
		$scope.scrollPosition = -250;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('enter-4')).toBe(true);
	});

	it('return element with entered class', function() {
		$scope.scrollPosition = -150;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('entered')).toBe(true);
	});

	it('return element with enter-4 class', function() {
		$scope.scrollPosition = -100;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('enter-4')).toBe(true);
	});

	it('return element with enter-3 class', function() {
		$scope.scrollPosition = -50;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('enter-3')).toBe(true);
	});

	it('return element with enter-2 class', function() {
		$scope.scrollPosition = 10;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('enter-2')).toBe(true);
	});

	it('return element with enter-1 class', function() {
		$scope.scrollPosition = 100;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('enter-1')).toBe(true);
	});

	it('return element with enter-5 class', function() {
		$scope.scrollPosition = 200;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('enter-5')).toBe(true);
	});

	it('return element with enter-0 class', function() {
		$scope.scrollPosition = 300;
		angular.element($window).triggerHandler('scroll');
		expect(element.hasClass('enter-0')).toBe(true);
	});
});
