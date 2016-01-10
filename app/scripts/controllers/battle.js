'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:BattleCtrl
 * @description
 * # BattleCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('BattleCtrl', function ($scope, $routeParams, $location, $window, $timeout, webServices) {
    $scope.showFight = 1;

    webServices.getTimeline({
      game: $routeParams.gameId
    }, function (response) {
      if(response.output === 'no round closed'){
        $location.path('/gameAdmin/'+$routeParams.gameId);
        return false;
      }
      var actions = response.output;
      
      for (var i = 0, len = actions.length; i < len; i++) {
        actions[i].randomBackground = $window.Math.floor(($window.Math.random() * 10) + 1);
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
          type: actions[i].target_type
        };
      }
      $scope.actions = actions;
    });

    $scope.nextFight = function (fightInDisplay) {
      $scope.showFight = fightInDisplay + 2;
      $timeout(function () {
        var scroller = $('.scroll-bottom');
        scroller.animate({
          scrollTop: scroller.height()
        }, 1000);
      });
    }

    $scope.nextRound = function () {
      webServices.nextRound({
        game: $routeParams.gameId
      }, function (response) {
        if(response.output.round){
          $location.path('/gameAdmin/'+$routeParams.gameId);
        }else{
          console.log(response);
        }
      });
    };

  });