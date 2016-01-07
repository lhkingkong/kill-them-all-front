'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('LoginCtrl', function ($scope, $location, $timeout, webServices, userInfo, adminUserInfo) {
    $scope.loginUser = "";
    $scope.loginPassword = "";
    $scope.wrongUser = false;
    $scope.somethingWrong = false;

    $('#inputUser').popover();
    $('#inputPassword').popover();

    $scope.keyPressEnter = function (e) {
      if (e.which === 13) {
        e.preventDefault();
        $scope.signIn(e);
      }
    };

    $scope.signUp = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      $location.path('/register');
    };

    $scope.signIn = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();

      if (validateUserFields()) {
        webServices.signIn({
          user: $scope.loginUser,
          password: $scope.loginPassword
        }, function (response) {
          if (typeof response.user == "undefined") {
            $scope.somethingWrong = true;
          } else {
            if (!response.user) {
              $scope.wrongUser = true;
              $timeout(function () {
                $scope.wrongUser = false;
              }, 2000);
              return false;
            }
            userInfo.set(response.user);
            $location.path('/');
          }
        });
      }
    };

    $scope.signInAdmin = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();

      if (validateUserFields()) {
        webServices.signInAdmin({
          admin: $scope.loginUser,
          password: $scope.loginPassword
        }, function (response) {
          if (typeof response.admin == "undefined") {
            $scope.somethingWrong = true;
          } else {
            if (!response.admin) {
              $scope.wrongUser = true;
              $timeout(function () {
                $scope.wrongUser = false;
              }, 2000);
              return false;
            }
            adminUserInfo.set(response.admin);
            $location.path('/admin');
          }
        });
      }
    };

    function validateUserFields() {
      if ($.trim($scope.loginUser) == "") {
        $('#inputPassword').popover("hide");
        $('#inputUser').popover("show");
        $('#inputUser').focus();
        return false;
      }
      if ($.trim($scope.loginPassword) == "") {
        $('#inputUser').popover("hide");
        $('#inputPassword').popover("show");
        $('#inputPassword').focus();
        return false;
      }
      return true;
    }
  });