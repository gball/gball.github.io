'use strict';

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

	  // some jquery for arrow down and navigation animation
	  $( "#navbar" ).hide();

		$(window).scroll(function () {
		  if ($( window ).scrollTop() > 60) {
		    $( "#arrow" ).stop().fadeOut(300);
		  } else if ($( window ).scrollTop() <= 60) {
		    $( "#arrow" ).stop().fadeIn(300);
		  }
		});
		
		$( "#menu-icon" ).click(function () {
			if ($( "#navbar" ).css( "display" ) === "none") { 
				$( "#navbar" ).slideDown();
			} else {
				$( "#navbar" ).slideUp();
			}
		});

	  // get current age of mine
	  $scope.getAge = function () {
	  	// current date minus birthday
	  	var timeInMS = new Date() - new Date('1993-01-23');
			var days = timeInMS / 1000 / (60 * 60 * 24);
			var age = Math.floor(days / 365);
	  	
	  	return age;
	  };
  }]);
