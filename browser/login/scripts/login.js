var angular = require('angular');
var constants = require('../../../app/constants');
var loginApp = angular.module('loginApp', []);
loginApp.controller('loginController', function($scope, $http) {
    $scope.loginData = {};
    $scope.submitLogin = function(login) {
      $http.post(constants.TUSK_ROOT + constants.SESSION_ENDPOINT,
      {username: $scope.username, password: $scope.password}).
      success(function(data) {

      }).
      error(function(data) {

      });
    };
  });

loginApp.controller('registerController', function($scope, $http) {
    $scope.registerData = {};
    $scope.submitRegister = function(register) {
      $http.post(constants.TUSK_ROOT + constants.USER_ENDPOINT,
      {username: $scope.username, password: $scope.password, email: $scope.email}).
      success(function(data) {

      }).
      error(function(data) {

      });
    };
  });
