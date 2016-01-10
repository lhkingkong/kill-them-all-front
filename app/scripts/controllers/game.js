'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('GameCtrl', function ($scope, $routeParams, $route, $filter, $timeout, $window, webServices, fighterInfo) {
    $scope.randomBackground = $window.Math.floor(($window.Math.random() * 10) + 1);
    $scope.gameName = '';
    $scope.currentRound = '';
    $scope.wait = true;
    $scope.searchFighter = '';
    $scope.onlyAlive = false;
    $scope.adversaries = [];
    $scope.targetAdversary = '';
    $scope.choice = 1;

    webServices.getCurrentRound({
      game: parseInt($routeParams.gameId)
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
      if (response.output.action && response.output.action.target) {
        searchCurrentActionAdversary(response.output.action);
        $scope.adversaryChosen = true;
      } else {
        $scope.adversaryChosen = false;
      }
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

    function searchCurrentActionAdversary(action) {
      for (var i = 0, len = $scope.adversaries.length; i < len; i++) {
        if ($scope.adversaries[i].iduser === action.target) {
          $scope.targetAdversary = $scope.adversaries[i];
        }
      }
    }

    $scope.$watchCollection('[searchFighter,onlyAlive,adversaries]', function (newValues, oldValues) {
      $scope.filteredAdversaries = $filter('filterFighter')($scope.adversaries, newValues);
    });

    $scope.selectTarget = function (target) {
      $timeout.cancel($scope.timeout1);
      $timeout.cancel($scope.timeout2);
      $scope.timeout1 = $timeout(function () {
        if($scope.myFighter.idclass == 3){
          if($scope.choice == 1){
            $scope.targetAdversary = false;
          }else{
            $scope.targetAdversary2 = false;
          }
        }else{
          $scope.targetAdversary = false;
        }
        $scope.timeout2 = $timeout(function () {
          if($scope.myFighter.idclass == 3){
            if($scope.choice == 1){
              $scope.targetAdversary = target;
            }else{
              $scope.targetAdversary2 = target;
            }
          }else{
            $scope.targetAdversary = target;
          }
        });
      });
    }

    $scope.attack = function () {
      var params = {
        target: $scope.targetAdversary.iduser,
        round: $scope.currentRound,
        game: parseInt($routeParams.gameId)
      };
      if($scope.myFighter.idclass == 3){
        if(!$scope.targetAdversary2.iduser){
          return false;
        }
        params.target2 = $scope.targetAdversary2.iduser;
      }
      webServices.createAction(params, function (response) {
        if (response.output === 'inserted') {
          $scope.adversaryChosen = true;
        } else {
          if (response.output === 'Already action in round') {
            $scope.adversaryChosen = true;
          }
          $scope.adversaryChosen = false;
        }
      });
    }

    $scope.reload = function () {
      $route.reload();
    };

  });