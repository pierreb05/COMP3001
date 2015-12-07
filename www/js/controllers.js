function startApp(){
//workout list (30min, 1 hour etc) not in any controller
var custom;
var workoutType = [
	{
		id : '1',
		name : '10km',
		type: 'd',
		value: 10
	}, {
		id :'2',
		name : '21km',
		type: 'd',
		value: 21
	}, {
		id : '3',
		name : '42km',
		type: 'd',
		value: 42
	}, {
		id : '4',
		name : '30 minutes',
		type: 't',
		value: 30
	}, {
		id : '5',
		name : '1 hour',
		type: 't',
		value: 60
	}, {
		id : '6',
		name : '',
		type: '',
		value: ''
	}
];


//helper function
function getWorkoutType(workoutId) {
  for (var i = 0; i < workoutType.length; i++) {
    if (workoutType[i].id === workoutId) {
      return workoutType[i];
    }
  }
  return undefined;
}

function checkPollution(lat, lng){
	var jsonUrl = "http://luftwagen.herokuapp.com/api/pollution?format=json&lat="+lat+"+&long="+lng;
	console.log(jsonUrl);
  	var jsonText = file_get_contents(jsonUrl);
  	var obj = JSON.parse(jsonText);
  	console.log(obj.pollution);


  	if(obj.pollution < 90){
  		return {
  			"text": "You are in a low polluted zone",
  			"value": obj.pollution
  		};
  	} else if (obj.pollution < 125){
  		return {
  			"text": "You are in a medium polluted zone",
  			"value": obj.pollution
  		};
  		
  	} else {
  		return {
  			"text": "You are in a high polluted zone!",
  			"value": obj.pollution
  		};
  		
  	}

}

function changeHealth(currentHealth, pollutionValue)
{
	// < 125 = heal, >=125 take damage
	var newHealth = (currentHealth -((currentHealth-125)/75)).toFixed(2);
	if (newHealth >= 100){
		newHealth = 100;
	}
	return newHealth;
}




angular.module('app.controllers', [])





.controller('homeCtrl', function($scope) {

})

.controller('pollutionMapCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {

$scope.$on('$stateChangeStart', 
             function(event, toState, toParams, fromState, fromParams){ 
    			//$ionicLoading.show();
    			console.log("sadadsasa");
    			logout();
  		});


 /*$scope.map = { center: { latitude: 51.508742, longitude: -0.120850 }, zoom: 8 };
 $scope.updateMap = function (lat, lng) {
		$scope.map = { center: { latitude: lat, longitude: lng }, zoom: 15 };
 	}*/

 	$scope.autocompleteOptions = {
        componentRestrictions: { country: 'uk' },
    }

	var marker;
 	 $scope.$on('mapInitialized', function(event, map) {
      //map.setCenter(new google.maps.LatLng(51.5085300, -0.1257400));
      //$scope.map.setZoom(12);
       var layer = new google.maps.FusionTablesLayer({
		    query: {
		       select: 'geometry',
		        from: '1pHZ_F-xDRFU0omNrpu-SdLoVYOm0Fm5CPDdSsbab'
		    }, 
		    styleId: 2, 
  			map: map 
	  	});

	  layer.setMap($scope.map);


	  var options = {timeout: 30000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 		
	    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);	
	    $scope.currentLat=position.coords.latitude;
		$scope.currentLng=position.coords.longitude;

		

	 	 marker = new google.maps.Marker({
			position: latLng,
		    map: $scope.map	 
		});
 
	  	}, function(error){
	   		console.log("Could not get location");
	   		console.log(error);
	  	});




      });


 	 /*$ionicPlatform.ready(function(){
       
	    }); */

 	 $scope.updateMap = function (lat, lng) {
		$scope.map.setCenter(new google.maps.LatLng(lat, lng));
		$scope.map.setZoom(15);
 	}
      
	  



 	//TRACK COORDINATES
	// call this once
	setupWatch(3000);

	// sets up the interval at the specified frequency
	function setupWatch(freq) {
	    // global var here so it can be cleared on logout (or whenever).
	    activeWatch = setInterval(watchLocation, freq);
	}

	// this is what gets called on the interval.
	function watchLocation() {
	    var gcp = navigator.geolocation.getCurrentPosition(
	            updateUserLoc, onError, {
	                enableHighAccuracy: true
	            });


	    // console.log(gcp);

	}

	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	}


	// do something with the results

	var location;

	function updateUserLoc(position) {


	location = {
	    lat : position.coords.latitude,
	    lng : position.coords.longitude
	};

	console.log(location.lat);
	console.log(location.lng);


		//need to scope.apply or else anguarjs is unaware of the update, update every 3 seconds
	     setTimeout(function () {
	        $scope.$apply(function () {
	            $scope.currentLat =  location.lat;
				$scope.currentLng = location.lng;
				
				var latLng = new google.maps.LatLng(location.lat, location.lng);

				//$scope.map.panTo(latLng);
			    marker.setPosition(latLng);
	        });
	    }, 3000);


	}



	// stop watching

	function logout() {
	    clearInterval(activeWatch);
	}


	$scope.centerMap= function(){

 		$scope.map.setCenter(new google.maps.LatLng($scope.currentLat, $scope.currentLng));
 	}


})

.controller('settingsCtrl', function($scope) {

})

.controller('directionCtrl', function($scope,  $cordovaGeolocation) {

$scope.$on('$stateChangeStart', 
             function(event, toState, toParams, fromState, fromParams){ 
    			//$ionicLoading.show();
    			console.log("sadadsasa");
    			logout();
  		});

$scope.locationADisabled = false;
$scope.locationBDisabled = false;

$scope.chooseCurrentLocationA = function(){
	$scope.locationADisabled = true;
};

$scope.chooseCurrentLocationA = function(){
	console.log("sds");
	alert("asda");
	$scope.locationBDisabled = true;
};








	

$scope.autocompleteOptions = {
    componentRestrictions: { country: 'uk' },
}

$scope.currentLat="";
$scope.currentLng="";
var marker;	
 $scope.$on('mapInitialized', function(event, map) {
	  	var options = {timeout: 10000, enableHighAccuracy: true};
       $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 		
	    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    $scope.currentLat=position.coords.latitude;
		$scope.currentLng=position.coords.longitude;

	 	 marker = new google.maps.Marker({
			position: latLng,
		    map: $scope.map	 
		});
 
	  	}, function(error){
	   		console.log("Could not get location");
	   		console.log(error);
	  	});
	    });



  	  



	//TRACK COORDINATES
	// call this once
	setupWatch(3000);

	// sets up the interval at the specified frequency
	function setupWatch(freq) {
	    // global var here so it can be cleared on logout (or whenever).
	    activeWatch = setInterval(watchLocation, freq);
	}

	// this is what gets called on the interval.
	function watchLocation() {
	    var gcp = navigator.geolocation.getCurrentPosition(
	            updateUserLoc, onError, {
	                enableHighAccuracy: true
	            });


	    // console.log(gcp);

	}

	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	}


	// do something with the results

	var location;

	function updateUserLoc(position) {


	location = {
	    lat : position.coords.latitude,
	    lng : position.coords.longitude
	};

	console.log(location.lat);
	console.log(location.lng);


		//need to scope.apply or else anguarjs is unaware of the update, update every 3 seconds
	     setTimeout(function () {
	        $scope.$apply(function () {
	            $scope.currentLat =  location.lat;
				$scope.currentLng = location.lng;
				
				var latLng = new google.maps.LatLng(location.lat, location.lng);

				//$scope.map.panTo(latLng);
			    marker.setPosition(latLng);
	        });
	    }, 3000);


	}



	// stop watching

	function logout() {
	    clearInterval(activeWatch);
	}
    
  

 	$scope.routes= [];


 	$scope.centerMap= function(){

 		$scope.map.setCenter(new google.maps.LatLng($scope.currentLat, $scope.currentLng));
 	}

  $scope.drawRoutes = function (lat1, lng1, lat2, lng2) {

  	var jsonUrl = "http://luftwagen.herokuapp.com/api/directions_A_to_B?Alat="+lat1+"&Along="+lng1+"&Blat="+lat2+"&Blong="+lng2+"&format=json";

  	/*var req = new XMLHttpRequest();
  	req.open("GET", jsonUrl, false);
  	req.send(null);
  	var jsonText;
  	if(req.status==200)
  	{
  		jsonText = req.responseText;
  		dump(jsonText);
  	}*/

  	var jsonText = file_get_contents(jsonUrl);
  	var obj = JSON.parse(jsonText);
  	//console.log(obj[0].coords);


	$scope.map.setCenter(new google.maps.LatLng(lat1, lng1));
	$scope.map.setZoom(13);
 	

	$scope.routes= [
	 	{
	 		path: obj[0].coords
	 	}, {
	 		path: obj[1].coords
	 	}, {
	 		path: obj[2].coords
	 	}
	 ];
 	}


 	






})

.controller('newWorkoutCtrl', function($scope) {

})

.controller('customWorkoutCtrl', function($scope, $state) {

	$scope.workout = getWorkoutType($state.params.workoutId);

	$scope.disableTime = true;
    $scope.disableDistance = true;


	$scope.changeFields = function() {
    if($scope.type == "Time") {
         $scope.disableDistance = true;
         $scope.disableTime = false;
         workoutType[5].type = 't';
    } else if($scope.type == "Distance") {
         $scope.disableTime = true;
         $scope.disableDistance = false;
         workoutType[5].type = 'd';
    } else {
    	$scope.disableTime = true;
        $scope.disableDistance = true;
    }
	};

	$scope.submit = function(){
		if($scope.type == "Time") {
         	workoutType[5].name = workoutType[5].value  + " minutes";
	    } else if($scope.type == "Distance") {
	    	workoutType[5].name = workoutType[5].value  + " km";
	    }
	};


})




.controller('recapCtrl', function($scope, $state) {
	$scope.timeMs = $state.params.time;
	$scope.distance = $state.params.distance;
	$scope.speed = $state.params.speed;
	$scope.health = $state.params.health;

	$scope.timeSeconds = Math.floor($scope.timeMs/1000);
	$scope.timeMinutes = Math.floor($scope.timeMs/60000);
	$scope.timeHours = Math.floor($scope.timeMs/3600000);
})

.controller('runCtrl', function($scope, $timeout, $cordovaGeolocation, $state, $interval, $cordovaLocalNotification) {

	//http://devdactic.com/local-notifications-ionic/
	//local notification
	  $scope.add = function() {
        var alarmTime = new Date();
        //current datetime + 1 minute, so trigger in 1 minute
        alarmTime.setMinutes(alarmTime.getMinutes());
        $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "You are execercising in a polluted area!",
            title: "Warning",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });
    };
 	
 	//if a notification is pending
    $scope.isScheduled = function() {
        $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }



     var promise2;
    // starts the interval
    $scope.start2 = function() {
      // stops any running interval to avoid two intervals running at the same time
      $scope.stop2(); 
      // store the interval promise
      promise2 = $interval(checkLocation, 1800000);//every 30 minutes
    };
    // stops the interval
    $scope.stop2 = function() {
      $interval.cancel(promise2);
    };
    // starting the interval by default
    $scope.start2();
    // stops the interval when the scope is destroyed,
    // this usually happens when a route is changed and 
    // the ItemsController $scope gets destroyed. The
    // destruction of the ItemsController scope does not
    // guarantee the stopping of any intervals, you must
    // be responsible of stopping it when the scope is
    // is destroyed.
    $scope.$on('$destroy', function() {
      $scope.stop2();
    });

    function checkLocation(){
    	console.log("checking location");
    	if($scope.pollutionData > 150){
    		$scope.add();
    	}
    }


//--------------------------------------------------------------



	$scope.$on('$stateChangeStart', 
             function(event, toState, toParams, fromState, fromParams){ 
    			//$ionicLoading.show();
    			console.log("sadadsasa");
    			logout();
  		});


	$scope.pollutionText = "Calculating pollution levels...";
	$scope.pollutionValue = 50;

	$scope.workout = getWorkoutType($state.params.workoutId);

 	$scope.currentLat = "";
	$scope.currentLng = "";
	$scope.timeInMilis = "";
	$scope.health = 100;


	var marker;
	var options = {timeout: 10000, enableHighAccuracy: true};





 	 $scope.$on('mapInitialized', function(event, map) {
	  
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
	    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);	
	    $scope.currentLat=position.coords.latitude;
		$scope.currentLng=position.coords.longitude;


	    var layer = new google.maps.FusionTablesLayer({
		    query: {
		       select: 'geometry',
		        from: '1pHZ_F-xDRFU0omNrpu-SdLoVYOm0Fm5CPDdSsbab'
		    }, 
		    styleId: 2, 
  			map: map 
	  	});
	  layer.setMap($scope.map);

	 	 marker = new google.maps.Marker({
			position: latLng,
		    map: $scope.map	 
		});
 

	    //json
	    /*console.log(position.coords.latitude);
	    console.log(position.coords.longitude);
	    var jsonUrl = "http://luftwagen.herokuapp.com/api/directions_for_workout?distance=0.00909&format=json&lat="+position.coords.latitude+"&long="+position.coords.longitude;
	    console.log(jsonUrl);
	    var jsonText = file_get_contents(jsonUrl);
	    var obj = JSON.parse(jsonText);
  		//console.log(obj[0].coords);
  		$scope.circle= [
	 	{
	 		path: obj[0].coords
	 	}, {
	 		path: obj[1].coords
	 	}, {
	 		path: obj[2].coords
	 	}	
	 ];*/


		
	  	}, function(error){
	   		console.log("Could not get location");
	   		console.log(error);
	  	});
	    });



  	  



	//TRACK COORDINATES
	// call this once
	setupWatch(3000);

	// sets up the interval at the specified frequency
	function setupWatch(freq) {
	    // global var here so it can be cleared on logout (or whenever).
	    activeWatch = setInterval(watchLocation, freq);
	}

	// this is what gets called on the interval.
	function watchLocation() {
	    var gcp = navigator.geolocation.getCurrentPosition(
	            updateUserLoc, onError, {
	                enableHighAccuracy: true
	            });


	    // console.log(gcp);

	}

	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	}


	// do something with the results

	var location;

	function updateUserLoc(position) {


	location = {
	    lat : position.coords.latitude,
	    lng : position.coords.longitude
	};

	console.log(location.lat);
	console.log(location.lng);


		//need to scope.apply or else anguarjs is unaware of the update, update every 3 seconds
	     //setTimeout(function () {
	        $scope.$apply(function () {
	            $scope.currentLat =  location.lat;
				$scope.currentLng = location.lng;
				
				var latLng = new google.maps.LatLng(location.lat, location.lng);

				//$scope.map.panTo(latLng);
			    marker.setPosition(latLng);
	        });
	    //}, 3000);
		var pollutionData = checkPollution(location.lat, location.lng);
		$scope.pollutionValue = pollutionData["value"];
	    $scope.pollutionText = pollutionData["text"];
	    $scope.health = changeHealth($scope.health, pollutionData["value"]);
	
	}



	// stop watching

	function logout() {
	    clearInterval(activeWatch);
	}

	$scope.centerMap= function(){

 		$scope.map.setCenter(new google.maps.LatLng($scope.currentLat, $scope.currentLng));
 	}



	 $scope.timerRunning = true;
 
    $scope.startTimer = function (){
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
      //console.log(222);
    };

    $scope.stopTimer = function (){
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
    };

    $scope.$on('timer-stopped', function (event, data){
    	$scope.timeInMilis = data.millis;
        console.log('Timer Stopped - data = ', data);
    });


    /*$scope.minute1 = 0; $scope.minute2= 0, $scope.second1 = 0, $scope.second2 = 0, $scope.hour1 = 0;
    var mytimeout = null;
    $scope.onTimeout = function() {
        if($scope.minute1 ==  5 && $scope.minute2 == 9 && $scope.second1 == 5 && $scope.second2 == 9) {
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            return;
        }
        else if ($scope.minute1 == 5 && $scope.minute2 == 9 && $scope.second1 == 5 && $scope.second2 == 9){
            $scope.second1 = 0;
            $scope.second2 = 0;
            $scope.minute2 = 0;
            $scope.minute1 = 0;
            $scope.hour2++;
        } else if ($scope.minute2 == 9 && $scope.second1 == 5 && $scope.second2 == 9){
            $scope.second1 = 0;
            $scope.second2 = 0;
            $scope.minute2 = 0;
            $scope.minute1++;
        }
        else if ($scope.second1 == 5 && $scope.second2 == 9){
            $scope.second1 = 0;
            $scope.second2 = 0;
            $scope.minute2++;
        }
        else if ($scope.second2 == 9){
            $scope.second2 = 0;
            $scope.second1++;
        }
        else $scope.second2++;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };*/
    $scope.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
        } else {
            alert('Error');
        }
    }




    var i = 0;
    var mydistance = null;
    var distance;
    var lat1, lat2, lon1, lon2;
    $scope.showPosition = function(position){
        if (i == 0){
            distance = 0;
            lat1 =  position.coords.latitude;
            lon1 =  position.coords.longitude;
        }
        else {
            lat2 = lat1;
            lon2 = lon1;
            lat1 = position.coords.latitude;
            lon1 = position.coords.longitude;
            distance += $scope.getDistance(lat1, lon1, lat2, lon2);
        }
        $scope.distance = distance.toFixed(1);
        i++;
        //console.log(distance);
        mydistance = $timeout($scope.getLocation, 1000);
    }
    $scope.startDistance = function(){
        mydistance = $timeout($scope.getLocation, 1000);
    };
    
    $scope.getDistance = function(lat1, lon1, lat2, lon2){
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;
        var result = 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km  
        return (result);//1 d.p
    };




    //------CODE FOR CHECKING THE TIME/DISTANCE ETC------------------------------
 	// store the interval promise in this variable
    var promise;
  
    // simulated items array
    $scope.items = [];
    
    // starts the interval
    $scope.start = function() {
      // stops any running interval to avoid two intervals running at the same time
      $scope.stop(); 
      
      // store the interval promise
      promise = $interval(checkWorkout, 1000);
    };
  
    // stops the interval
    $scope.stop = function() {
      $interval.cancel(promise);
    };
  
    // starting the interval by default
    $scope.start();
 
    // stops the interval when the scope is destroyed,
    // this usually happens when a route is changed and 
    // the ItemsController $scope gets destroyed. The
    // destruction of the ItemsController scope does not
    // guarantee the stopping of any intervals, you must
    // be responsible of stopping it when the scope is
    // is destroyed.
    $scope.$on('$destroy', function() {
      $scope.stop();
    });

    //format h = hour, m = minutes, s= seconds
    function timeToMs(number, format){
    	if(format == "m"){
    		return number * 60000;
    	} else if(format == "s"){
    		return number * 1000;
    	} if(format == "h"){
    		return number * 3600000;
    	}
    	
    }

    $scope.speed = "";
     function checkWorkout() {
     	//calculate speed here
     	$scope.$on('timer-tick', function (event, data) {
			dist = $scope.distance; 
		    if ($scope.timerRunning === true) {
		    	$scope.speed = ((dist/1000) / (data.millis/3600000)).toPrecision(2);
		    }
		});
     	//var speed = ;
     	$scope.speed = parseFloat($scope.speed).toPrecision(2);
     	var speed =  $scope.speed;

    	console.log($scope.workout.id);
        switch($scope.workout.id){
	    	case '1':
	    		var dist = $scope.distance;
	    		if($scope.distance >= 10000){
	    			$scope.$on('timer-tick', function (event, data) {
	    				if ($scope.timerRunning === true) {
					        $scope.$broadcast('timer-stop');
					        $state.go('recap', { distance: dist, time: data.millis, speed: speed, health: 4 });
		    				logout();
					    }
	    			});
				   }	    		
	    		break;
	    	case '2':
	    		var dist = $scope.distance;
	    		if($scope.distance >= 21000){
	    			$scope.$on('timer-tick', function (event, data) {
	    				if ($scope.timerRunning === true) {
					        $scope.$broadcast('timer-stop');
					        $state.go('recap', { distance: dist, time: data.millis, speed: speed, health: 4 });
		    				logout();
					    }
	    				});
				    }
	    		
	    		break;
	    	case '3':
	    		var dist = $scope.distance;
	    		if($scope.distance >= 42000){
	    			$scope.$on('timer-tick', function (event, data) {
	    				if ($scope.timerRunning === true) {
					        $scope.$broadcast('timer-stop');
					        $state.go('recap', { distance: dist, time: data.millis, speed: speed, health: 4 });
		    				logout();
					    }
	    				});
				    }
	    		
	    		break;
	    	case '4':
	    		var dist = $scope.distance;
	    		
	    		$scope.$on('timer-tick', function (event, data) {
	    			dist = $scope.distance; 
				    if ($scope.timerRunning === true && data.millis >= timeToMs(30,'m')) {
				        $scope.$broadcast('timer-stop');
				        console.log(dist);
				        $state.go('recap', { distance: dist, time: data.millis, speed: speed, health: 4 });
	    				logout();
				    }
				});

	    		//if ($scope.timerRunning === true && data.millis >= 5000){   			
	    		//}
	    		break;
	    	case '5':
	    		var dist = $scope.distance;
	    		$scope.$on('timer-tick', function (event, data) {
				    if ($scope.timerRunning === true && data.millis >= timeToMs(60, 'm')) {
				        $scope.$broadcast('timer-stop');
				       $state.go('recap', { distance: dist, time: data.millis, speed: speed, health: 4 });
	    				logout();
				    }
				});
	    		break;

	    	case '6':
	    		var dist = $scope.distance;
	    		//custom
	    		if($scope.workout.type == 't'){
	    			console.log("ttttt  "+ $scope.workout.value * 1000);
	    			$scope.$on('timer-tick', function (event, data) {
					    if ($scope.timerRunning === true && data.millis >= timeToMs($scope.workout.value, 'm')) {
					        $scope.$broadcast('timer-stop');
					        $state.go('recap', { distance: dist, time: data.millis, speed: speed, health: 4 });
		    				logout();
					    }
					});
	    		} else {
	    			console.log("66666  "+ $scope.workout.value * 1000);
	    			if($scope.distance >= ($scope.workout.value * 1000)){
		    			$scope.$on('timer-tick', function (event, data) {
						    if ($scope.timerRunning === true) {
						        $scope.$broadcast('timer-stop');
						        $state.go('recap', { distance: dist, time: data.millis, speed: speed, health: 4 });
			    				logout();
						    }
					});
		    		}
	    		}
	    		
	    		break;	
		}
	   };
    
    
})








.controller('workoutDetailCtrl', function($scope, $cordovaGeolocation, $state) {
	console.log("det");

	//ionic view lifecycle needs controller to be at ion-view instead of ion-content but google maps wont work
	/*$scope.$on('$ionicView.leave', function() {
	    console.log('leave.');
	    
	  });*/
	
	//statemanager angular (different from ionic view lifecycle)
	$scope.$on('$stateChangeStart', 
             function(event, toState, toParams, fromState, fromParams){ 
    			//$ionicLoading.show();
    			console.log("sadadsasa");
    			logout();
  		});

	$scope.workout = getWorkoutType($state.params.workoutId);

	$scope.pollutionText = "Calculating pollution levels...";
	$scope.currentLat = "";
	$scope.currentLng = "";


	var marker;
	var options = {timeout: 10000, enableHighAccuracy: true};





 	 $scope.$on('mapInitialized', function(event, map) {
	  
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
	    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);	



	    var layer = new google.maps.FusionTablesLayer({
		    query: {
		       select: 'geometry',
		        from: '1pHZ_F-xDRFU0omNrpu-SdLoVYOm0Fm5CPDdSsbab'
		    }, 
		    styleId: 2, 
  			map: map 
	  	});
	  layer.setMap($scope.map);

	 	 marker = new google.maps.Marker({
			position: latLng,
		    map: $scope.map	 
		});
 

	    //json
	   /* console.log(position.coords.latitude);
	    console.log(position.coords.longitude);
	    var jsonUrl = "http://luftwagen.herokuapp.com/api/directions_for_workout?distance=0.00909&format=json&lat="+position.coords.latitude+"&long="+position.coords.longitude;
	    console.log(jsonUrl);
	    var jsonText = file_get_contents(jsonUrl);
	    var obj = JSON.parse(jsonText);
  		//console.log(obj[0].coords);
  		$scope.circle= [
	 	{
	 		path: obj[0].coords
	 	}, {
	 		path: obj[1].coords
	 	}, {
	 		path: obj[2].coords
	 	}	
	 ];*/


		
	  	}, function(error){
	   		console.log("Could not get location");
	   		console.log(error);
	  	});
	    });

  


  	  



	//TRACK COORDINATES
	// call this once
	setupWatch(3000);

	// sets up the interval at the specified frequency
	function setupWatch(freq) {
	    // global var here so it can be cleared on logout (or whenever).
	    activeWatch = setInterval(watchLocation, freq);
	}

	// this is what gets called on the interval.
	function watchLocation() {
	    var gcp = navigator.geolocation.getCurrentPosition(
	            updateUserLoc, onError, {
	                enableHighAccuracy: true
	            });


	    // console.log(gcp);

	}

	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	}


	// do something with the results

	function updateUserLoc(position) {


	var location = {
	    lat : position.coords.latitude,
	    lng : position.coords.longitude
	};

	console.log(location.lat);
	console.log(location.lng);


		//need to scope.apply or else anguarjs is unaware of the update, update every 3 seconds
	     //setTimeout(function () {
	        $scope.$apply(function () {
	            $scope.currentLat =  location.lat;
				$scope.currentLng = location.lng;
				
				var latLng = new google.maps.LatLng(location.lat, location.lng);

				//$scope.map.panTo(latLng);
			    marker.setPosition(latLng);
	        });
	    //}, 3000);

	     var pollutionData = checkPollution(location.lat, location.lng);
	     $scope.pollutionText = pollutionData["text"];
	}



	// stop watching

	function logout() {
	    clearInterval(activeWatch);
	}

		
})



}
startApp();