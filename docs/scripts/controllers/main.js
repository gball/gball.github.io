'use strict';

angular.module('gballgithubioApp')
  .controller('MainCtrl', ['$scope',
												   'aboutMe',
						               'education',
						               'experience',
						               'skills',
						               'passion',
						               'quotes',
	  function  ($scope,
	  	         aboutMe,
	           	 education,
	           	 experience,
	           	 skills,
	           	 passion,
	           	 quotes) {

	  // following variables contain information received from backend
	  $scope.aboutMe = aboutMe;
	  $scope.experience = experience;
	  $scope.education = education;
	  $scope.passion = passion;
	  $scope.quotes = quotes;

		// format data receieved from db for graph library
	  $scope.graphData = skills;

	  // variable for graph library configurations
		$scope.options = {
			thickness: 4, 
			mode: 'gauge', 
			total: 100
		};
		
	  // get current age of mine
	  $scope.getAge = function () {
	  	// current date minus birthday
	  	var timeInMS = new Date() - new Date('1993-01-23');
			var days = timeInMS / 1000 / (60 * 60 * 24);
			var age = Math.floor(days / 365);
	  	
	  	return age;
	  };
  }]);
