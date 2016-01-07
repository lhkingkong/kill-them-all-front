'use strict';

/**
 * @ngdoc directive
 * @name conquerApp.directive:mainHeader
 * @description
 * # mainHeader
 */
angular.module('conquerApp')
  .directive('mainHeader', function ($location, $routeParams, webServices, userInfo, adminUserInfo, fighterInfo) {
    return {
      templateUrl: '../../views/mainheader.html',
      restrict: 'E',
      replace:'true',
      link: function postLink(scope, element, attrs) {
        scope.gameName = '';
        if(typeof adminUserInfo.get() !== 'undefined')
          scope.userName = adminUserInfo.get().username;
        if(!scope.userName)
          scope.userName = userInfo.get().realname;
        
        if($routeParams.gameId){
          webServices.getGames({}, function(response){
            for(var i = 0, len = response.output.length;i<len;i++){
              if(response.output[i].idgame.toString()===$routeParams.gameId){
                scope.gameName = response.output[i].name;
              }
            }
          });
        }
        
        scope.logOff = function (e) {
          e.stopImmediatePropagation();
          e.preventDefault();
          console.log('log off');
          userInfo.clean();
          adminUserInfo.clean();
          fighterInfo.clean();
          webServices.logOff({}, function (response) {
            $location.path('/login');
          });
        }
      }
    };
  });