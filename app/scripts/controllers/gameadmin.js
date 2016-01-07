'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:GameadminCtrl
 * @description
 * # GameadminCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('GameadminCtrl', function ($scope, $routeParams, webServices) {
    $scope.gameName = '';
    webServices.getCurrentRound({
      game: $routeParams.gameId
    }, function (response) {
      $scope.gameName = response.output.game.name;
      $scope.currentRound = response.output.round.round;
    });
  });