'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:GameadminCtrl
 * @description
 * # GameadminCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('GameadminCtrl', function ($scope, $routeParams, $route, $filter, $timeout, $location, $window, webServices) {
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

    $scope.endGame = function () {
      if (confirm('Did you want to finish the game? (the winners will be the fighters that still have life)')) {
        webServices.endGame({
          game: $routeParams.gameId
        }, function (response) {
          if (response.output === 'ended') {
            $location.path('/end/' + $routeParams.gameId);
          } else {
            console.log(response);
          }
        });
      }
    };

    $scope.toggleOnlyAlive = function () {
      $scope.onlyAlive = !$scope.onlyAlive;
    };

    $scope.killRandom = function () {
      if ($scope.kills > 0) {
        webServices.killRandom({
          game: $routeParams.gameId,
          kills: $scope.kills,
          round: $scope.currentRound
        }, function (response) {
          if(response.output && response.output !== 'no fighter'){
            $scope.filteredAdversaries = $scope.adversaries = response.output;
          }
        });
      }
    }

    $scope.kill = function () {
      webServices.killFighter({
        fighter: $scope.targetAdversary.idfighter
      }, function (response) {
        console.log(response.output);
      });
    };

    $scope.revive = function () {
      webServices.reviveFighter({
        fighter: $scope.targetAdversary.idfighter,
        hp: $scope.targetAdversary.classhp
      }, function (response) {
        console.log(response.output);
      });
    };

    $scope.changeGame = function () {
      $location.path('\admin');
    };

  });