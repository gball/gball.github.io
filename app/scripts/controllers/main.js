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
	  $scope.passion = passion.passion;
	  $scope.quotes = quotes.quotes;
	  $scope.passionLength = $scope.passion.length;
		$scope.graphData = getData();
		$scope.options = {
			thickness: 4, 
			mode: "gauge", 
			total: 100
		};

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

	  // format data receieved from db for graph library
	  function getData() {
			var tmpData = [];

			for (var i = 0; i < skills.skills.length; i++) {
				tmpData.push([{
					label: skills.skills[i].name, 
					value: skills.skills[i].strength, 
					color: "grey", 
					colorComplement: "white"
				}]);
			}

			for (var j = 0; j < tools.tools.length; j++) {
				tmpData.push([{
					label: tools.tools[j].name, 
					value: tools.tools[j].strength, 
					color: "grey", 
					colorComplement: "white"
				}]);
			}

			return tmpData;
	  }
  }]);
