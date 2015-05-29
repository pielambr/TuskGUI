var angular = require('angular');
var ipc = require('ipc');
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
        ipc.send('showMessages');
      }).
      error(function(data) {
        k$.growl({
          title: 'Login failed',
          text: 'Your login failed, please try again.',
          type: 'growl-red'
        });
      });
    };
  });

loginApp.controller('registerController', function($scope, $http) {
    $scope.registerData = {};
    $scope.submitRegister = function(register) {
      $http.post(constants.TUSK_ROOT + constants.USER_ENDPOINT,
      {username: $scope.username, password: $scope.password, email: $scope.email}).
      success(function(data) {
        k$.growl({
          title: 'Registration successful',
          text: 'Your registration was successful, please login.',
          type: 'growl-green'
        });
      }).
      error(function(data) {
        if(data.error = errors.USERNAME_TAKEN) {
          k$.growl({
            title: 'Registration failed',
            text: 'This username already exists, please choose another.',
            type: 'growl-red'
          });
        } else {
          k$.growl({
            title: 'Registration failed',
            text: 'Your registration failed, please try again.',
            type: 'growl-red'
          });
        }
      });
    };
  });
