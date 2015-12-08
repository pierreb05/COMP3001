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
      
    })
        
      
    
      
        
    .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html',
      controller: 'settingsCtrl'
    })
        
      
    
      
        
    .state('direction', {
      url: '/direction',
      templateUrl: 'templates/direction.html',
     
    })
        
      
    
      
        
    .state('newWorkout', {
      url: '/newworkout',
      templateUrl: 'templates/newWorkout.html',
      controller: 'newWorkoutCtrl'
    })
        
      
    
      
        
    .state('customWorkout', {
      url: '/customworkout/:workoutId',
      templateUrl: 'templates/customWorkout.html',
      
    })
        
      
    .state('run', {
      url: '/run/:workoutId',
      templateUrl: 'templates/run.html',
      
    })

    .state('recap', {
      url: '/end/:distance/:time/:speed/:health',
      templateUrl: 'templates/recap.html',
      controller: 'recapCtrl'
    })
      
        
    .state('workoutDetail', {
      url: '/detail/:workoutId',
      templateUrl: 'templates/workoutDetail.html',
      
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});