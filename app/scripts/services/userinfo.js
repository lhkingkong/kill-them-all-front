'use strict';

/**
 * @ngdoc service
 * @name conquerApp.userInfo
 * @description
 * # userInfo
 * Factory in the conquerApp.
 */
angular.module('conquerApp')
  .factory('userInfo', function () {
    var set = function(user){
      this.user = user;
    }

    var get = function(){
      return this.user;
    }

    var clean = function(){
      delete this.user;
    }

    // Public API here
    return {
      set: set,
      get: get,
      clean: clean
    };
  });
