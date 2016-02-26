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
    'smoothScroll'
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
              defer.resolve(response);
            });

            return defer.promise;
          }],
          education: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getEducation( function (err, response) {
              if (err) {
                return $q.reject(err);
              }
              defer.resolve(response);
            });
            
            return defer.promise;
          }],
          experience: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getExperience( function (err, response) {
              if (err) {
                return $q.reject(err);
              }
              defer.resolve(response);
            });
            
            return defer.promise;
          }],
          skills: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getSkills( function (err, response) {
              if (err) {
                return $q.reject(err);
              }
              defer.resolve(response);
            });
            
            return defer.promise;
          }],
          tools: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getTools( function (err, response) {
              if (err) {
                return $q.reject(err);
              }
              defer.resolve(response);
            });
            
            return defer.promise;
          }],
          passion: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getPassion( function (err, response) {
              if (err) {
                return $q.reject(err);
              }
              defer.resolve(response);
            });
            
            return defer.promise;
          }],
          quotes: ['$q', 'dataFactory', function ($q, dataFactory) {
            var defer = $q.defer();

            dataFactory.getQuotes( function (err, response) {
              if (err) {
                return $q.reject(err);
              }
              defer.resolve(response);
            });
            
            return defer.promise;
          }],
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
