'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('GameCtrl', function ($scope, $routeParams, webServices, fighterInfo, $filter, $timeout) {
    $scope.gameName = '';
    $scope.currentRound = '';
    $scope.wait = true;
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
      $scope.gameName = response.output.game.name;
      $scope.currentRound = response.output.round.round;
      removeMyFighterFromAdversaries(response.output.fighters);
    });

    function removeMyFighterFromAdversaries(fighters) {
      var myFighter = fighterInfo.get();
      $scope.adversaries = [];
      for (var i = 0, len = fighters.length; i < len; i++) {
        if (myFighter.idfighter !== fighters[i].idfighter) {
          $scope.adversaries.push(fighters[i]);
        } else {
          fighterInfo.set(fighters[i]);
          $scope.myFighter = fighters[i];
        }
      }

    }

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

    $scope.attack = function () {
      var params = {
        target: $scope.targetAdversary.idfighter,
        round: $scope.currentRound,
        game: $routeParams.gameId
      };
      console.log(params);
    }

  });