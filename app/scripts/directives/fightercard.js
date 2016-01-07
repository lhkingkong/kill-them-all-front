'use strict';

/**
 * @ngdoc directive
 * @name conquerApp.directive:fighterCard
 * @description
 * # fighterCard
 */
angular.module('conquerApp')
  .directive('fighterCard', function () {
    return {
      templateUrl: '../../views/fightercard.html',
      restrict: 'E',
      replace:'true',
      scope:{
        fighter:'=',
        total:'='
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
