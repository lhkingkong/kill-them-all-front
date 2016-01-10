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

    webServices.getActions({
      game: $routeParams.gameId
    }, function (response) {
      $scope.actions = response.output;
      for (var i = 0, len = $scope.actions.length; i < len; i++) {
        $scope.actions[i].randomBackground = $window.Math.floor(($window.Math.random() * 10) + 1);

      }
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