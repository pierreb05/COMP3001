// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','ionic.service.core', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'uiGmapgoogle-maps', 'ngMap', 'ngCordova', 'timer', 'google.places'])


//for android
.run(function($ionicPlatform, $rootScope, $timeout) {



  $ionicPlatform.ready(function() {
  	/*For iOS 8 only, it is a requirement to request for notification permissions first.  */
  	/*if(device.platform === "iOS") {
        window.plugin.notification.local.promptForPermission();
    }*/

  	//DONT NEED PUSH (SENT FROM SERVER) NOTIFICATION WE JUST NEED LOCAL NOTIFICATIONS
  	//push notification https://apps.ionic.io/app/49609b3c/push/list
  	//token - COPY FROM CONSOLE
  	//tutorial - android ios http://devdactic.com/ionic-push-notifications/

  	//use this http://www.joshmorony.com/an-introduction-to-ionic-push/
  	 /* var push = new Ionic.Push({
	    "debug": true
	  });
	 
	  push.register(function(token) {
	    console.log("Device token:",token.token);
	  });*/



    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }

      window.plugin.notification.local.onadd = function (id, state, json) {
            var notification = {
                id: id,
                state: state,
                json: json
            };
            $timeout(function() {
                $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
            });
        };
    
  });
})


//https://apps.ionic.io/apps for app - settings = api key
//http://www.joshmorony.com/an-introduction-to-ionic-push/
/*.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '49609b3c',
    // The public API key all services will use for this app
    api_key: '4a98beddab5e942e1913fd461d6bd04e43d1496b5f2b5bf2',
    // Set the app to use development pushes
    dev_push: true
  });
}])*/