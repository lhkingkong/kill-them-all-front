'use strict';

/**
 * @ngdoc directive
 * @name conquerApp.directive:classCard
 * @description
 * # classCard
 */
angular.module('conquerApp')
  .directive('classCard', function () {
    return {
      templateUrl: '../../views/classcard.html',
      restrict: 'E',
      replace:true,
      scope:{
        fighterClass:'='
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
