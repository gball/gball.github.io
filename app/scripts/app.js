'use strict';

/**
 * @ngdoc overview
 * @name gballgithubioApp
 * @description
 * # gballgithubioApp
 *
 * Main module of the application.
 */
angular
  .module('gballgithubioApp', [
    'ngResource',
    'ngRoute',
    'smoothScroll',
    'n3-pie-chart'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          /**
           * following is to preload data with information from API call
           * providing the controller with data needed to render html page
           */
          aboutMe: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getAboutMe( function (err, response) {
              if (err) {
                return $q.reject(err);
              }
              defer.resolve(response.aboutMe);
            });

            return defer.promise;
          }],
          education: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getEducation( function (err, response) {
              if (err) {
                return $q.reject(err);
              }
              defer.resolve(response.education);
            });
            
            return defer.promise;
          }],
          experience: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getExperience( function (err, response) {
              if (err) {
                return $q.reject(err);
              }
              defer.resolve(response.experience);
            });
            
            return defer.promise;
          }],
          skills: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getSkills( function (err, response) {
              if (err) {
                return $q.reject(err);
              }

              var skills = response.skills;
              var tmpSkillsData = []; 

              // format data to be used by n3 graph lib
              for (var i = 0; i < skills.length; i++) {
                tmpSkillsData.push([{
                  label: skills[i].name, 
                  value: skills[i].strength, 
                  color: 'grey', 
                  colorComplement: 'white'
                }]);
              }

              defer.resolve(tmpSkillsData);
            });
            
            return defer.promise;
          }],
          passion: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getPassion( function (err, response) {
              if (err) {
                return $q.reject(err);
              }
              defer.resolve(response.passion);
            });
            
            return defer.promise;
          }],
          quotes: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getQuotes( function (err, response) {
              if (err) {
                return $q.reject(err);
              }
              defer.resolve(response.quotes);
            });
            
            return defer.promise;
          }],
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
