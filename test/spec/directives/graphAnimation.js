'use strict';

describe('Section Animation Directive graph-animation', function () {	
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
		$window.innerHeight = 300;
		element = angular.element('<div graph-animation></div>');
		$scope = $rootScope.$new();
		$scope.options = {
	        animate: {
	          enabled: false
	        },
	        thickness: 14, 
	        mode: 'gauge', 
	        total: 100
        };
		$compile(element)($scope);
		spyOn(angular.element, 'prop').and.returnValue(400);
	}));
	
	// run tests
	it('should hide animation in mobile view', function() {
		$window.innerWidth = 300;
		angular.element($window).triggerHandler('scroll');
		expect($scope.options.thickness).toBe(4);
	});

	it('should show and hide graph based on scroll position', function() {
		$scope.scrollPosition = 550;
		angular.element($window).triggerHandler('scroll');
		expect($scope.options.thickness).toBe(4);
		expect($scope.options.thickness).not.toBe(0);

		$scope.scrollPosition = 50;
		angular.element($window).triggerHandler('scroll');
		expect($scope.options.thickness).toBe(0);
		expect($scope.options.thickness).not.toBe(4);
	});
});
