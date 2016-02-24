'use strict';

/**
 * @ngdoc function
 * @name gballgithubioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gballgithubioApp
 */
angular.module('gballgithubioApp')
  .controller('MainCtrl', ['$scope',
  												 'aboutMe',
                           'education',
                           'experience',
                           'skills',
                           'tools',
                           'passion',
                           'quotes',
	  function	($scope,
	  	         aboutMe,
	           	 education,
	           	 experience,
	           	 skills,
	           	 tools,
	           	 passion,
	           	 quotes) {

	  $scope.aboutMe = aboutMe.aboutMe;
	  $scope.experience = experience.experience;
	  $scope.education = education.education;
	  $scope.skills = skills.skills;
	  $scope.tools = tools.tools;
	  $scope.passion = passion.passion;
	  $scope.quotes = quotes.quotes;

	  // get current age of mine
	  $scope.getAge = function () {
	  	// current date minus birthday
	  	var timeInMS = new Date() - new Date('1993-01-23');
			var days = timeInMS / 1000 / (60 * 60 * 24);
			var age = Math.floor(days / 365);
	  	return age;
	  };
  }]);
