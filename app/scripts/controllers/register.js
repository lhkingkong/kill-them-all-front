'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('RegisterCtrl', function ($scope, $timeout, $location, webServices, userInfo) {
    $scope.loginUser = "";
    $scope.realUser = "";
    $scope.loginPassword = "";
    $scope.loginConfirmPassword = "";
    $scope.wrongPassword = false;
    $scope.invalidUser = false;
    $scope.somethingWrong = false;

    $('#inputUser').popover();
    $('#inputPassword').popover();

    $scope.return = function (e) {
      $location.path('/login');
    };

    $scope.signUp = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      $('.popover').popover('hide');

      $scope.realUser = $.trim($scope.realUser);
      $scope.loginUser = $.trim($scope.loginUser);
      $scope.loginPassword = $.trim($scope.loginPassword);
      $scope.loginConfirmPassword = $.trim($scope.loginConfirmPassword);

      if ($scope.realUser == "") {
        $('#realUser').popover("show").focus();
        return false;
      }
      if ($scope.loginUser == "") {
        $('#inputUser').popover("show").focus();
        return false;
      }
      if ($scope.loginPassword == "") {
        $('#inputPassword').popover("show").focus();
        return false;
      }
      if ($scope.loginConfirmPassword == "") {
        $('#inputConfirmPassword').popover("show").focus();
        return false;
      }
      if ($scope.loginConfirmPassword != $scope.loginPassword) {
        $scope.loginConfirmPassword = '';
        $scope.loginPassword = '';
        $('#inputPassword').focus();
        $scope.notEqual = true;
        $timeout(function () {
          $scope.notEqual = false;
        }, 3000);
        return false;
      }

      webServices.signUp({
        //"id": 0,
        "realname": $scope.realUser,
        "username": $scope.loginUser,
        "password": $scope.loginPassword
      }, function (response) {
        if (typeof response.user == "undefined") {
          $scope.somethingWrong = true;
        } else {
          if (!response.user) {
            $scope.wrongPassword = true;
            return false;
          }
          userInfo.set(response.user);
          $location.path('/');
        }
      });
    };
  });