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
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
