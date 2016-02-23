'use strict';

angular.module('gballgithubioApp')
  // using google doc as lightweight database
  .factory('dataFactory',['$http', function($http){
    var getAboutMe = function(cb){
      $http.get('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/1/public/values?alt=json')
        .success(function(response){
          var content = response.feed.entry[0];
          response = {
            name: content.gsx$name.$t,
            location: content.gsx$location.$t,
            backgroundInfo: content.gsx$backgroundinfo.$t
          };

          cb(undefined, response);
        })
        .error(function(err){
          cb(err);
        });
    };

    var getEducation = function(cb){
      $http.get('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/2/public/values?alt=json')
        .success(function(response){
          var length = response.feed.entry.length;
          var tmpResponse = [];
          for (var i = 0; i < length; i++) {
            var content = response.feed.entry[i];
            var obj = {
              schoolName: content.gsx$schoolname.$t,
              location: content.gsx$location.$t,
              degree: content.gsx$degree.$t,
              gpa: parseInt(content.gsx$gpa.$t),
              date: content.gsx$date.$t
            };
            tmpResponse.push(obj);
          }

          response = tmpResponse;
          cb(undefined, response);
        })
        .error(function(err){
          cb(err);
        });
    };

    var getExperience = function(cb){
      $http.get('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/3/public/values?alt=json')
        .success(function(response){
          var length = response.feed.entry.length;
          var tmpResponse = [];
          for (var i = 0; i < length; i++) {
            var content = response.feed.entry[i];
            var obj = {
              company: content.gsx$company.$t,
              location: content.gsx$location.$t,
              position: content.gsx$position.$t,
              info: content.gsx$info.$t,
              date: content.gsx$date.$t
            };
            tmpResponse.push(obj);
          }

          response = tmpResponse;
          cb(undefined, response);
        })
        .error(function(err){
          cb(err);
        });
    };

    var getSkills = function(cb){
      $http.get('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/4/public/values?alt=json')
        .success(function(response){
          var length = response.feed.entry.length;
          var tmpResponse = [];
          for (var i = 0; i < length; i++) {
            var content = response.feed.entry[i];
            var obj = {
              name: content.gsx$name.$t,
              strength: parseInt(content.gsx$strength.$t)
            };
            tmpResponse.push(obj);
          }

          response = tmpResponse;
          cb(undefined, response);
        })
        .error(function(err){
          cb(err);
        });
    };

    var getTools = function(cb){
      $http.get('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/5/public/values?alt=json')
        .success(function(response){
          var length = response.feed.entry.length;
          var tmpResponse = [];
          for (var i = 0; i < length; i++) {
            var content = response.feed.entry[i];
            var obj = {
              name: content.gsx$name.$t,
              strength: parseInt(content.gsx$strength.$t)
            };
            tmpResponse.push(obj);
          }

          response = tmpResponse;
          cb(undefined, response);
        })
        .error(function(err){
          cb(err);
        });
    };

    var getPassion = function(cb){
      $http.get('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/6/public/values?alt=json')
        .success(function(response){
          var length = response.feed.entry.length;
          var tmpResponse = [];
          for (var i = 0; i < length; i++) {
            var content = response.feed.entry[i];
            var obj = {
              type: content.gsx$type.$t,
              info: content.gsx$info.$t
            };
            tmpResponse.push(obj);
          }

          response = tmpResponse;
          cb(undefined, response);
        })
        .error(function(err){
          cb(err);
        });
    };

    var getQuotes = function(cb){
      $http.get('https://spreadsheets.google.com/feeds/list/1Shh-V6ypqU7hFQCJxsg9CN5rnWN0d0t6VwviRiHCoe8/7/public/values?alt=json')
        .success(function(response){
          var length = response.feed.entry.length;
          var tmpResponse = [];
          for (var i = 0; i < length; i++) {
            var content = response.feed.entry[i];
            var obj = {
              section: content.gsx$section.$t,
              quote: content.gsx$quote.$t
            };
            tmpResponse.push(obj);
          }

          response = tmpResponse;
          cb(undefined, response);
        })
        .error(function(err){
          cb(err);
        });
    };

    return {
      getAboutMe: getAboutMe,
      getEducation: getEducation,
      getExperience: getExperience,
      getSkills: getSkills,
      getTools: getTools,
      getPassion: getPassion,
      getQuotes: getQuotes
    };
  }]);
