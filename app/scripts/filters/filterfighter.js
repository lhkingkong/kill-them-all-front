'use strict';

/**
 * @ngdoc filter
 * @name conquerApp.filter:filterFighter
 * @function
 * @description
 * # filterFighter
 * Filter in the conquerApp.
 */
angular.module('conquerApp')
  .filter('filterFighter', function () {
    return function (input, searchValues) {
      var result = [];
      if(!searchValues){
        return input;
      }
      var searchText = searchValues[0];
      var status = searchValues[1];
      for(var i = 0, len = input.length;i<len;i++){
        if(input[i].name.toLowerCase().indexOf(searchText.toLowerCase())>=0){
          if(status){
            if(input[i].hp>0){
              result.push(input[i]);
            }
          }else{
            if(searchValues[2] === true){
              if(input[i].hp<=0){
                result.push(input[i]);
              }
            }else{
              result.push(input[i]);
            }
          }
        }
      }
      return result;
    };
  });
