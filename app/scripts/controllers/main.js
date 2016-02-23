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

	  $scope.aboutMe = aboutMe;
	  $scope.experience = experience;
	  $scope.education = education;
	  $scope.skills = skills;
	  $scope.tools = tools;
	  $scope.passion = passion;
	  $scope.quotes = quotes;
  }]);
