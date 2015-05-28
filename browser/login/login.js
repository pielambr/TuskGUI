var angular = require('angular');
var $ = require('jquery');
var constants = require('../../app/constants');
var errors = require('../../app/errors');
var loginApp = angular.module('loginApp', []);
loginApp.controller('loginController', function($scope, $http) {
    $scope.loginData = {};
    $scope.submitLogin = function(login) {
      $http.post(constants.TUSK_ROOT + constants.SESSION_ENDPOINT,
      {username: $scope.username, password: $scope.password}).
      success(function(data) {
        localStorage["username"] = $scope.username;
        localStorage["session"] = data.session;
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
        if(data.error = errors.USERNAME_TAKEN) {

        } else {

        }
      });
    };
  });
