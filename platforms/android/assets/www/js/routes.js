angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    })
        
      
    
      
        
    .state('pollutionMap', {
      url: '/pollutionmap',
      templateUrl: 'templates/pollutionMap.html',
      controller: 'pollutionMapCtrl'
    })
        
      
    
      
        
    .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html',
      controller: 'settingsCtrl'
    })
        
      
    
      
        
    .state('direction', {
      url: '/direction',
      templateUrl: 'templates/direction.html',
      controller: 'directionCtrl'
    })
        
      
    
      
        
    .state('newWorkout', {
      url: '/newworkout',
      templateUrl: 'templates/newWorkout.html',
      controller: 'newWorkoutCtrl'
    })
        
      
    
      
        
    .state('customWorkout', {
      url: '/customworkout',
      templateUrl: 'templates/customWorkout.html',
      controller: 'customWorkoutCtrl'
    })
        
      
    .state('run', {
      url: '/run/:workoutId',
      templateUrl: 'templates/run.html',
      controller: 'runCtrl'
    })

    .state('recap', {
      url: '/end',
      templateUrl: 'templates/recap.html',
      controller: 'recapCtrl'
    })
      
        
    .state('workoutDetail', {
      url: '/detail/:workoutId',
      templateUrl: 'templates/workoutDetail.html',
      controller: 'workoutDetailCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});