'use strict';

/**
 * @ngdoc function
 * @name conquerApp.controller:FightercreationCtrl
 * @description
 * # FightercreationCtrl
 * Controller of the conquerApp
 */
angular.module('conquerApp')
  .controller('FightercreationCtrl', function ($scope, webServices, $routeParams, $location, fighterInfo) {
    $scope.hideParameters = true;
    $scope.color = Math.floor((Math.random() * 5) + 1);;
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

    $scope.getImagePath = function () {
      if (typeof $scope.gender === 'undefined' ||
        typeof $scope.selectedClass === 'undefined' ||
        $scope.selectedClass === '') {
        return;
      }
      var spriteClass = '';
      // knight

      switch ($scope.selectedClass.idclass) {
      case 1:
        spriteClass = 'knight';
        break;
      case 2:
        spriteClass = 'wizard';
        break;
      case 3:
        spriteClass = 'archer';
        break;
      case 4:
        spriteClass = 'assassin';
        break;
      }
      spriteClass += '-' + $scope.gender + '-' + $scope.color;
      return spriteClass;
    };

    $scope.changeColor = function () {
      if ($scope.color === 5) {
        $scope.color = 1;
      } else {
        $scope.color++;
      }
    };

    $scope.createFighter = function () {
      switch ($scope.color) {
        case 4:
          $scope.killSpeech = 'The Force is strong in you!';
          $scope.lastWords = 'Sorry, I did my best';
          $scope.victorySpeech = 'May the force be with me when I take that breakfast in La Gula';
          break;
        case 5:
          $scope.killSpeech = 'I wanna be the very best... Pokemon!';
          $scope.lastWords = 'Sorry, I did my best';
          $scope.victorySpeech = 'Pokemon rules!';
          break;
        default: 
          $scope.killSpeech = 'I must win this breakfast in La Gula!';
          $scope.lastWords = 'Sorry, I did my best';
          $scope.victorySpeech = 'Awesome! I won the breakfast in La Gula!';
          break;
      }
      if (typeof $scope.gender === 'undefined' ||
        typeof $scope.fighterName === 'undefined' ||
        typeof $scope.killSpeech === 'undefined' ||
        typeof $scope.lastWords === 'undefined' ||
        typeof $scope.victorySpeech === 'undefined' ||
        typeof $scope.fighterType === 'undefined' ||
        typeof $scope.selectedClass === 'undefined' ||
        $scope.fighterName === '' ||
        $scope.killSpeech === '' ||
        $scope.lastWords === '' ||
        $scope.victorySpeech === '' ||
        $scope.selectedClass === '') {
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
        game: $routeParams.gameId,
        color: $scope.color
      };
      webServices.createFighter(params, function (response) {
        if (response.output === 'game started') {
          alert("Sorry you can't enter into a middle of a battle.");
        }
        if (response.output === 'no rounds registered') {
          alert("Please wait for the administrator, to start the game");
        }
        if (response.output.idfighter) {
          fighterInfo.set(response.output);
          $location.path('/game/' + $routeParams.gameId);
        }
      });
    };
  });