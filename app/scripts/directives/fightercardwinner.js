'use strict';

/**
 * @ngdoc directive
 * @name conquerApp.directive:fighterCardWinner
 * @description
 * # fighterCardWinner
 */
angular.module('conquerApp')
  .directive('fighterCardWinner', function () {
    return {
      templateUrl: '../../views/fightercardwinner.html',
      restrict: 'E',
      replace: 'true',
      scope: {
        fighter: '=',
        total: '=',
        damage: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.getClassName = function () {
          if (!scope.fighter) return '';
          var spriteClass = '';

          switch (scope.fighter.idclass) {
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
          return spriteClass;
        };
        
        scope.getImage = function () {
          if (!scope.fighter) return '';
          var spriteClass = '';
          // knight
          switch (scope.fighter.idclass) {
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
          spriteClass += '-' + scope.fighter.gender + '-' + scope.fighter.color;
          return spriteClass;
        };

        scope.getDamage = function () {
          if (!scope.damage || !scope.fighter) return 0;
          if (scope.fighter.hp + scope.damage > scope.fighter.classhp) {
            return scope.fighter.classhp;
          } else {
            return scope.damage;
          }
        }
      }
    };
  });