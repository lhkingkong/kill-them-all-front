'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:EndCtrl
 * @description
 * # EndCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('EndCtrl', function ($scope, $routeParams, $location, $filter, $timeout, $window, webServices) {

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

      organizeTargetFightersInfo(response.output.fighters);

      $scope.fighters = response.output.fighters;

      var searchValues = ['', true];
      $scope.aliveFighters = $filter('filterFighter')(response.output.fighters, searchValues);
      searchValues = ['', false, true];
      var deadFighters = $filter('filterFighter')(response.output.fighters, searchValues);
      $scope.deadFighters1 = [];
      $scope.deadFighters2 = [];
      for (var i = 0, len = deadFighters.length; i < len; i++) {
        if (i < len / 2) {
          $scope.deadFighters1.push(deadFighters[i]);
        } else {
          $scope.deadFighters2.push(deadFighters[i]);
        }
      }
    });

    function organizeTargetFightersInfo(fighters) {
      var actions = [];
      for (var j = 0, len2 = fighters.length; j < len2; j++) {
        actions = fighters[j].info.timeline;
        for (var i = 0, len = actions.length; i < len; i++) {
          actions[i].randomBackground = $window.Math.floor(($window.Math.random() * 10) + 1);
          actions[i].userRealName = getUserByIdFighter(fighters, actions[i].idfighter);
          actions[i].target_fighter = {
            classhp: actions[i].target_classhp,
            color: actions[i].target_color,
            gender: actions[i].target_gender,
            hp: actions[i].target_hp,
            idclass: actions[i].target_idclass,
            idfighter: actions[i].target_idfighter,
            idgame: actions[i].target_idgame,
            iduser: actions[i].target_iduser,
            lastwords: actions[i].target_lastwords,
            name: actions[i].target_name,
            status: actions[i].target_status,
            type: actions[i].target_type,
            userRealName: getUserByIdFighter(fighters, actions[i].target_idfighter)
          };
        }
      }
    }

    function getUserByIdFighter(fighters, idfighter) {
      for (var j = 0, len2 = fighters.length; j < len2; j++) {
        if (idfighter === fighters[j].idfighter) {
          return fighters[j].info.user.realname;
        }
      }
    }

    $scope.setInfoModal = function (fighter) {
      $scope.showFight = 1;
      $scope.modalFighter = fighter;
    };
  });