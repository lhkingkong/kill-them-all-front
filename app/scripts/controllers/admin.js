'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('AdminCtrl', function ($scope, $location, webServices) {
    $scope.selectedGame = '';
    getGames();

    $scope.createGame = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();

      if ($scope.newGameName) {
        webServices.createGame({
          name: $scope.newGameName
        }, function (response) {
          $scope.games = response.output;
          $('#createGameModal').modal('hide');
          $scope.newGameName = '';
        });
      }
    };

    $scope.selectGame = function (game) {
      for(var i = 0, len = $scope.games.length;i<len;i++){
        $scope.games[i].selected = false;
      }
      game.selected = true;
      $scope.selectedGame = game;
    };

    $scope.enterGame = function () {
      console.log($scope.games);
      console.log($scope.selectedGame);
      $location.path('/gameAdmin/'+$scope.selectedGame.idgame);
    };

    function getGames() {
      webServices.getGames({}, function (response) {
        $scope.games = response.output;
      });
    }
  });