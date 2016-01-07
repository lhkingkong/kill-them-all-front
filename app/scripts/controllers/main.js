'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('conquerApp')
  .controller('MainCtrl', function ($scope, webServices, $location) {
    getGames();

    function getGames() {
      webServices.getGames({}, function (response) {
        console.log(response);
        $scope.games = response.output;
      });
    }

    $scope.selectGame = function (game) {
      for (var i = 0, len = $scope.games.length; i < len; i++) {
        $scope.games[i].selected = false;
      }
      game.selected = true;
      $scope.selectedGame = game;
    };

    $scope.enterGame = function () {
      if($scope.selectedGame)
        $location.path('/game/' + $scope.selectedGame.idgame);
    };

  });