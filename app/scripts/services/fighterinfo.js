'use strict';

/**
 * @ngdoc service
 * @name conquerApp.fighterInfo
 * @description
 * # fighterInfo
 * Service in the conquerApp.
 */
angular.module('conquerApp')
  .service('fighterInfo', function () {
    var set = function (fighter) {
      this.fighter = fighter;
    }

    var get = function () {
      return this.fighter;
    }

    var clean = function () {
      delete this.fighter;
    }

    // Public API here
    return {
      set: set,
      get: get,
      clean: clean
    };
  });