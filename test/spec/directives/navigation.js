'use strict';

describe('Navigation Directive', function() {
	var element;
	var $scope;
	var $document;
	var $window;

	// load the app module 
	beforeEach(module('gballgithubioApp'));
	
	// clean the slate after each test
	afterEach(function() {
		document.body.innerHTML = '';
		angular.element($window).unbind("scroll resize");
	});

	// menu-click directive test in navigation file
	describe('menu-click', function() {
		beforeEach(inject(function($compile, $rootScope, _$document_) {
			element = angular.element('<div menu-click></div><nav id="navbar" class="navbar-hide"></nav>');
			$document = _$document_;
			$scope = $rootScope.$new();
			$compile(element)($scope);
			spyOn(document, 'querySelector').and.callFake(function () {
			    return element;
		    });
		}));

		it('should show navbar after first click on menu icon', function () {
			element.triggerHandler('click');
			expect(element.hasClass('navbar-show')).toBe(true);
			expect(element.hasClass('navbar-hide')).toBe(false);
		});

		it('should not show navbar after two clicks on menu icon', function() {
			element.triggerHandler('click');
			element.triggerHandler('click');
			expect(element.hasClass('navbar-show')).toBe(false);
			expect(element.hasClass('navbar-hide')).toBe(true);
		});
	});

	// arrow-scroll directive test in navigation file
	describe('arrow-scroll', function() {
		beforeEach(inject(function($compile, $rootScope, _$document_, _$window_) {
			element = angular.element('<div arrow-scroll id="arrow"></div>');
			$document = _$document_;
			$window = _$window_;
			$scope = $rootScope.$new();
			$scope.scrollPosition = 250;
			$compile(element)($scope);
			spyOn(document, 'querySelector').and.callFake(function () {
			    return element;
		    });
		}));

		it('should fade out the arrow', function () {
			angular.element($window).triggerHandler('scroll');
			expect(angular.element(document.querySelector('#arrow')).hasClass('fade-out')).toBe(true);
			expect(angular.element(document.querySelector('#arrow')).hasClass('fade-in')).toBe(false);
		});

		it('should fade in the arrow', function () {
			$scope.scrollPosition = 5;
			angular.element($window).triggerHandler('scroll');
			expect(angular.element(document.querySelector('#arrow')).hasClass('fade-in')).toBe(true);
			expect(angular.element(document.querySelector('#arrow')).hasClass('fade-out')).toBe(false);
		});
	});
	
	// nav-scroll-update directive test in navigation file
	describe('nav-scroll-update', function() {
		beforeEach(inject(function($compile, $rootScope, _$window_) {
			$window = _$window_;
			$window.innerHeight = 100;
			$scope = $rootScope.$new();
			$compile(angular.element('<div nav-scroll-update>'))($scope);
			spyOn(document, 'getElementById').and.callFake(function () {
			    return {
	    			offsetTop: 0,
	      		   	offsetHeight: 110
			    };
		    });
		}));

		it('should set active to value of 1', function () {
			$scope.scrollPosition = 50;
			angular.element($window).triggerHandler('scroll');
			expect($scope.isActive).toBe(1);
			expect($scope.isActive).not.toBe(4);
		});

		it('should set active to value of 2', function () {
			$scope.scrollPosition = 150;
			angular.element($window).triggerHandler('scroll');
			expect($scope.isActive).toBe(2);
			expect($scope.isActive).not.toBe(14);
		});

		it('should set active to value of 3', function () {
			$scope.scrollPosition = 250;
			angular.element($window).triggerHandler('scroll');
			expect($scope.isActive).toBe(3);
			expect($scope.isActive).not.toBe(1);
		});

		it('should set active to value of 4', function () {
			$scope.scrollPosition = 350;
			angular.element($window).triggerHandler('scroll');
			expect($scope.isActive).toBe(4);
			expect($scope.isActive).not.toBe(43);
		});

		it('should set active to value of 5', function () {
			$scope.scrollPosition = 450;
			angular.element($window).triggerHandler('scroll');
			expect($scope.isActive).toBe(5);
			expect($scope.isActive).not.toBe(6);
		});

		it('should set active to value of 6', function () {
			$scope.scrollPosition = 550;
			angular.element($window).triggerHandler('scroll');
			expect($scope.isActive).toBe(6);
			expect($scope.isActive).not.toBe(1);
		});

		it('should set active to value of 7', function () {
			$scope.scrollPosition = 650;
			angular.element($window).triggerHandler('scroll');
			expect($scope.isActive).toBe(7);
			expect($scope.isActive).not.toBe(8);
		});			
	});
});
