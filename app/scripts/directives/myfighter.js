'use strict';

/**
 * @ngdoc directive
 * @name conquerApp.directive:myFighter
 * @description
 * # myFighter
 */
angular.module('conquerApp')
  .directive('myFighter', function () {
    return {
      templateUrl: '../../views/myfighter.html',
      restrict: 'E',
      replace:'true',
      scope:{
        fighter:'='
      },
      link: function postLink(scope, element, attrs) {
        scope.getImage = function(){
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
      }
    };
  });
