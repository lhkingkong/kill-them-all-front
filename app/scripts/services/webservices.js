'use strict';

/**
 * @ngdoc service
 * @name conquerApp.webservices
 * @description
 * # webservices
 * Service in the conquerApp.
 */
angular.module('conquerApp')
  .service('webServices', ['$resource', '$http', '$location', function ($resource, $http, $location) {
    // Service logic
    // ...
    $http.defaults.useXDomain = true;

    var verifyUser = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller',{controller:"user"});
      //var Service = $resource('http://localhost:3000/api/:controller',{controller:"conquerors"}, { get:{ isArray:true }});
      //http://localhost:3000/api/Users
      
      Service = Service.get({}).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);

      /*$.post("http://localhost:8080/user/", 
        params,
        function(data){
            console.log(data);
        });*/
    }
    
    var verifyAdminUser = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller',{controller:"admin"});

      Service = Service.get({}).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var signIn = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller/sign_in',{controller:"user"});
      
      Service = Service.save(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }
    
    var signInAdmin = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller/sign_in',{controller:"admin"});

      Service = Service.save(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var signUp = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller/sign_up',{controller:"user"});
      
      Service = Service.save(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var logOff = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller/log_off',{controller:"user"});
      
      Service = Service.save(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }
    
    // games
    var getGames = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller',{controller:"game"});

      Service = Service.get(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var createGame = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller/create',{controller:"game"}, { "insert" : {method:'POST'} });

      Service = Service.insert(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }
    
    // rounds
    var getCurrentRound = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller',{controller:"round"});

      Service = Service.get(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }
    
    //fighters
    var verifyFighter = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller',{controller:"fighter"});

      Service = Service.get(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }
    
    var createFighter = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller/create',{controller:"fighter"}, { "insert" : {method:'POST'} });

      Service = Service.insert(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }
    
    // fighter classes
    var getFighterClasses = function(params, callback){
      var Service = $resource('http://localhost:8081/:controller',{controller:"fighterClass"});

      Service = Service.get({}).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }
    
    

    // tasks
    var getTasks = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller',{controller:"task"});

      Service = Service.get(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var createTask = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller/create',{controller:"task"}, { "insert" : {method:'POST'} });

      Service = Service.insert(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var editTask = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller/',{controller:"task"});

      Service = Service.save(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var sortTasks = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller/sort',{controller:"task"});

      Service = Service.save(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }

    var removeTask = function(params, callback){
      var Service = $resource('http://localhost:8080/:controller/:task_id',{controller:"task"});

      Service = Service.delete(params).$promise.then(function(response) {
        _successResponse(response,callback);
      },_errorResponse);
    }


    //used for all
    var _successResponse = function(response, callback){
      if(response.output ==='not admin'){
        return false;
      }
      return callback(response);
    }

    var _errorResponse = function(error){
      alert("Error when you call a service, please try again");
    }

    // Public API here
    return {
      verifyUser: verifyUser,
      verifyAdminUser: verifyAdminUser,
      signIn: signIn,
      signInAdmin: signInAdmin,
      signUp: signUp,
      logOff: logOff,
      getGames: getGames,
      createGame: createGame,
      getCurrentRound: getCurrentRound,
      verifyFighter: verifyFighter,
      createFighter: createFighter,
      getFighterClasses: getFighterClasses,
      getTasks: getTasks,
      createTask: createTask,
      sortTasks: sortTasks,
      removeTask: removeTask,
      editTask: editTask
    };
  }]);
