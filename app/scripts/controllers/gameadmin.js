'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:GameadminCtrl
 * @description
 * # GameadminCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('GameadminCtrl', function ($scope, $routeParams, $route, $filter, $timeout, $location, $window,  webServices) {
    $scope.randomBackground = $window.Math.floor(($window.Math.random() * 10) + 1);
    $scope.gameName = '';
    $scope.currentRound = '';
    $scope.searchFighter = '';
    $scope.onlyAlive = false;
    $scope.adversaries = [];
    $scope.targetAdversary = '';

    webServices.getCurrentRound({
      game: $routeParams.gameId
    }, function (response) {
      if (response.output.wait) {
        $scope.wait = true;
        return;
      } else {
        $scope.wait = false;
      }
      if (response.output.inBattle) {
        $location.path('/battle/' + $routeParams.gameId);
        return;
      }
      $scope.gameName = response.output.game.name;
      $scope.currentRound = response.output.round.round;
      $scope.filteredAdversaries = $scope.adversaries = response.output.fighters;
    });

    $scope.$watchCollection('[searchFighter,onlyAlive,adversaries]', function (newValues, oldValues) {
      $scope.filteredAdversaries = $filter('filterFighter')($scope.adversaries, newValues);
    });

    $scope.selectTarget = function (target) {
      $timeout(function () {
        $scope.targetAdversary = false;
        $timeout(function () {
          $scope.targetAdversary = target;
        });
      });
    }

    $scope.reload = function () {
      $route.reload();
    };

    $scope.battle = function () {
      $location.path('/battle/' + $routeParams.gameId);
    };

    $scope.closeRound = function () {
      webServices.closeRound({
        game: $routeParams.gameId
      }, function (response) {
        if (response.output === 'closed') {
          $location.path('/battle/' + $routeParams.gameId);
        } else {
          console.log(response);
        }
      });
    };
  });