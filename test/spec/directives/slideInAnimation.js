
'use strict';

describe('Slide In Animation Directive', function() {
	var element;
	var $scope;
	var $document;
	var $window;

	// load the controller's module
	beforeEach(module('gballgithubioApp'));

	// initialize the controller and a mock scope prior to each test
	beforeEach(inject(function($rootScope, _$document_, _$window_) {
		$window = _$window_;
		$window.innerHeight = 10;
		$window.innerWidth = 800;
		$document = _$document_;
		$scope = $rootScope.$new();		
		$scope.scrollPosition = 100;
	}));

	// clean the mock after each test
	afterEach(function() {
		document.body.innerHTML = '';
		angular.element($window).unbind("scroll resize");
	});

	// test images sliding in from the left
	describe('slide in left check', function() {
		beforeEach(inject(function ($compile){
			element = angular.element('<img slide-in-animation class="img-experience-left">');
			$document.find('body').append(element);
			$compile(element)($scope);
		}));

		it('should not do animation for mobile view so no changes', function () {
			$window.innerWidth = 300;
			angular.element($window).triggerHandler('scroll');
			expect(element.hasClass('slide-in-left')).toBe(false);
			expect(element.hasClass('slide-in-right')).toBe(false);
			expect(element.hasClass('img-experience-left')).toBe(true);
		});

		it('should return image element that contains slide in left class', function () {
			angular.element($window).triggerHandler('scroll');
			expect(element.hasClass('slide-in-left')).toBe(true);
			expect(element.hasClass('slide-in-right')).toBe(false);
		});

		it('should return image element that contains img-experience-left', function () {
			angular.element($window).triggerHandler('scroll');
			$scope.scrollPosition = 5;
			angular.element($window).triggerHandler('scroll');
			expect(element.hasClass('slide-in-left')).toBe(false);
			expect(element.hasClass('slide-in-right')).toBe(false);
			expect(element.hasClass('img-experience-right')).toBe(false);
			expect(element.hasClass('img-experience-left')).toBe(true);
		});
	});
	
	// test images sliding in from the right
	describe('slide in right check', function() {
		beforeEach(inject(function ($compile){
			element = angular.element('<img slide-in-animation class="img-experience-right">');
			$document.find('body').append(element);
			$compile(element)($scope);
		}));

		it('should return image element that contains slide in right class', function () {
			angular.element($window).triggerHandler('scroll');
			expect(element.hasClass('slide-in-left')).toBe(false);
			expect(element.hasClass('slide-in-right')).toBe(true);
		});

		it('should return image element that contains img-experience-right', function () {
			angular.element($window).triggerHandler('scroll');
			$scope.scrollPosition = 5;
			angular.element($window).triggerHandler('scroll');
			expect(element.hasClass('slide-in-left')).toBe(false);
			expect(element.hasClass('slide-in-right')).toBe(false);
			expect(element.hasClass('img-experience-right')).toBe(true);
			expect(element.hasClass('img-experience-left')).toBe(false);
		});
	});
});
