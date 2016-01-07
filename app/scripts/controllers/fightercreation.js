'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:FightercreationCtrl
 * @description
 * # FightercreationCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('FightercreationCtrl', function ($scope, webServices, $routeParams, $location, ghterInfo) {
    $scope.classes = [];
    $scope.selectedClass = '';
    webServices.getFighterClasses({}, function (response) {
      $scope.classes = response.output;
    });

    $scope.selectClass = function (fighterClass) {
      for (var i = 0, len = $scope.classes.length; i < len; i++) {
        $scope.classes[i].selected = false;
      }
      fighterClass.selected = true;
      $scope.selectedClass = fighterClass;
    };

    $scope.createFighter = function () {
      if(typeof $scope.gender ==='undefined' || 
         typeof $scope.fighterName ==='undefined' || 
         typeof $scope.killSpeech ==='undefined' || 
         typeof $scope.lastWords ==='undefined' || 
         typeof $scope.victorySpeech ==='undefined' || 
         typeof $scope.fighterType ==='undefined' || 
         typeof $scope.selectedClass ==='undefined' || 
         typeof $scope.gender ==='undefined' || 
         $scope.fighterName ==='' ||
         $scope.killSpeech ==='' ||
         $scope.lastWords ==='' ||
         $scope.victorySpeech ==='' ||
         $scope.selectedClass ===''){
        return;
      }
      var params = {
        gender: $scope.gender,
        name: $scope.fighterName,
        killSpeech: $scope.killSpeech,
        lastWords: $scope.lastWords,
        victorySpeech: $scope.victorySpeech,
        type: $scope.fighterType,
        fighterClass: $scope.selectedClass.idclass,
        hp: $scope.selectedClass.hp,
        game: $routeParams.gameId
      };
      webServices.createFighter(params,function(response){
        if(response.output.idfighter){
          fighterInfo.set(response.output);
          $location.path('/game/'+$routeParams.gameId);
        }
      })
      console.log(params);
    };
  });