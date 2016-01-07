'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('conquerApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'btford.socket-io'
  ])
  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.withCredentials = true;

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          response: ['webServices', '$q', '$location', '$resource', 'userInfo', function (webServices, $q, $location, $resource, userInfo) {
            var dfd = $q.defer();
            var user = userInfo.get();
            if (!user) {
              webServices.verifyUser({}, function (response) {
                if (!response.user) {
                  $location.path('/login');
                  dfd.reject('Not logged');
                } else {
                  userInfo.set(response.user);
                  dfd.resolve();
                }
              });
            } else {
              dfd.resolve();
            }
            return dfd.promise;
          }]
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {
          response: ['webServices', '$q', '$location', '$resource', 'userInfo', function (webServices, $q, $location, $resource, userInfo) {
            var dfd = $q.defer();
            var user = userInfo.get();
            if (!user) {
              webServices.verifyUser({}, function (response) {

                if (!response.user) {
                  dfd.resolve();
                } else {
                  userInfo.set(response.user);
                  $location.path('/');
                  dfd.resolve();
                }
              });
            } else {
              $location.path('/');
              dfd.resolve();
            }
            return dfd.promise;
          }]
        }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin',
        resolve: {
          response: ['webServices', '$q', '$location', '$resource', 'adminUserInfo', function (webServices, $q, $location, $resource, adminUserInfo) {
            var dfd = $q.defer();
            var user = adminUserInfo.get();
            if (!user) {
              webServices.verifyAdminUser({}, function (response) {
                if (!response.admin) {
                  $location.path('/login');
                  dfd.reject('Not logged');
                } else {
                  adminUserInfo.set(response.admin);
                  dfd.resolve();
                }
              });
            } else {
              dfd.resolve();
            }
            return dfd.promise;
        }]
        }
      })
      .when('/gameAdmin/:gameId', {
        templateUrl: 'views/gameadmin.html',
        controller: 'GameadminCtrl',
        controllerAs: 'gameAdmin',
        resolve: {
          response: ['webServices', '$q', '$location', '$resource', 'adminUserInfo', function (webServices, $q, $location, $resource, adminUserInfo) {
            var dfd = $q.defer();
            var user = adminUserInfo.get();
            if (!user) {
              webServices.verifyAdminUser({}, function (response) {
                if (!response.admin) {
                  $location.path('/login');
                  dfd.reject('Not logged');
                } else {
                  adminUserInfo.set(response.admin);
                  dfd.resolve();
                }
              });
            } else {
              dfd.resolve();
            }
            return dfd.promise;
        }]
        }
      })
      .when('/game/:gameId', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        controllerAs: 'game',
        resolve: {
          response: ['webServices', '$q', '$location', '$resource', '$route', 'userInfo', 'fighterInfo', function (webServices, $q, $location, $resource, $route, userInfo, fighterInfo) {
            var dfd = $q.defer();
            var user = userInfo.get();
            if (!user) {
              webServices.verifyUser({}, function (response) {
                if (!response.user) {
                  $location.path('/login');
                  dfd.reject('Not logged');
                } else {
                  userInfo.set(response.user);
                  var fighter = fighterInfo.get();
                  var fighter = fighterInfo.get();
                  if (!fighter) {
                    webServices.verifyFighter({
                      game: $route.current.params.gameId
                    }, function (response) {
                      if (!response.output.idfighter) {
                        dfd.reject('no fighter');
                        $location.path('/game/' + $route.current.params.gameId + '/fighterCreation');
                      } else {
                        fighterInfo.set(response.output);
                        dfd.resolve();
                      }
                    });
                  } else {
                    dfd.resolve();
                  }
                }
              });
            } else {
              var fighter = fighterInfo.get();
              if (!fighter) {
                webServices.verifyFighter({
                  game: $route.current.params.gameId
                }, function (response) {
                  if (!response.output.idfighter) {
                    dfd.reject('no fighter');
                    $location.path('/game/' + $route.current.params.gameId + '/fighterCreation');
                  } else {
                    fighterInfo.set(response.output);
                    dfd.resolve();
                  }
                });
              } else {
                dfd.resolve();
              }
            }
            return dfd.promise;
        }]
        }
      })
      .when('/game/:gameId/fighterCreation', {
        templateUrl: 'views/fightercreation.html',
        controller: 'FightercreationCtrl',
        controllerAs: 'fighterCreation',
        resolve: {
          response: ['webServices', '$q', '$location', '$resource', '$route', 'userInfo', 'fighterInfo', function (webServices, $q, $location, $resource, $route, userInfo, fighterInfo) {
            var dfd = $q.defer();
            var user = userInfo.get();
            if (!user) {
              webServices.verifyUser({}, function (response) {
                if (!response.user) {
                  $location.path('/login');
                  dfd.reject('Not logged');
                } else {
                  userInfo.set(response.user);

                  var fighter = fighterInfo.get();
                  if (!fighter) {
                    webServices.verifyFighter({
                      game: $route.current.params.gameId
                    }, function (response) {
                      console.log(response);
                      if (!response.output.idfighter) {
                        dfd.resolve();
                      } else {
                        fighterInfo.set(response.output);
                        $location.path('/game/' + $route.current.params.gameId);
                      }
                    });
                  } else {
                    $location.path('/game/' + $route.current.params.gameId);
                  }
                }
              });
            } else {
              var fighter = fighterInfo.get();
              if (!fighter) {
                webServices.verifyFighter({
                  game: $route.current.params.gameId
                }, function (response) {
                  if (!response.output.idfighter) {
                    dfd.resolve();
                  } else {
                    fighterInfo.set(response.output);
                    $location.path('/game/' + $route.current.params.gameId);
                  }
                });
              } else {
                $location.path('/game/' + $route.current.params.gameId);
              }
            }
            return dfd.promise;
        }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);