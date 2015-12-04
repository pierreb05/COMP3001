angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {

})

.controller('pollutionMapCtrl', function($scope) {
 /*$scope.map = { center: { latitude: 51.508742, longitude: -0.120850 }, zoom: 8 };
 $scope.updateMap = function (lat, lng) {
		$scope.map = { center: { latitude: lat, longitude: lng }, zoom: 15 };
 	}*/

 	 $scope.$on('mapInitialized', function(event, map) {
      //map.setCenter(new google.maps.LatLng(51.5085300, -0.1257400));
      //$scope.map.setZoom(12);
    });

 	 $scope.updateMap = function (lat, lng) {
		$scope.map.setCenter(new google.maps.LatLng(lat, lng));
		$scope.map.setZoom(15);
 	}
})

.controller('settingsCtrl', function($scope) {

})

.controller('directionCtrl', function($scope) {
 $scope.$on('mapInitialized', function(event, map) {
      //map.setCenter(new google.maps.LatLng(51.5085300, -0.1257400));
      //$scope.map.setZoom(12);
    });
  

 	$scope.routes= [];


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
  	console.log(obj[0].coords);

	$scope.routes= [
	 	{
	 		path: obj[0].coords
	 	}, {
	 		path: obj[1].coords
	 	}, {
	 		path: obj[2].coords
	 	}, {
	 		path: obj[3].coords
	 	}, {
	 		path: obj[4].coords
	 	}, {
	 		path: obj[5].coords
	 	}, {
	 		path: obj[6].coords
	 	}, {
	 		path: obj[7].coords
	 	}, {
	 		path: obj[8].coords
	 	}, {
	 		path: obj[9].coords
	 	}
	 ];
 	}
})

.controller('newWorkoutCtrl', function($scope) {

})

.controller('customWorkoutCtrl', function($scope) {

})

.controller('recapCtrl', function($scope) {

})

.controller('runCtrl', function($scope, $timeout, $cordovaGeolocation) {


 	var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map-container2"), mapOptions);
    var marker = new google.maps.Marker({
		position: latLng,
	    map: $scope.map	 
	 });
 
  }, function(error){
    console.log("Could not get location");
  });





    $scope.minute1 = 0; $scope.minute2= 0, $scope.second1 = 0, $scope.second2 = 0;
    var mytimeout = null;
    $scope.onTimeout = function() {
        if($scope.minute1 ==  5 && $scope.minute2 == 9 && $scope.second1 == 5 && $scope.second2 == 9) {
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            return;
        }
        else if ($scope.minute2 == 5 && $scope.second1 == 5 && $scope.second2 == 9){
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
    };
    
})

.controller('workoutDetailCtrl', function($scope, $cordovaGeolocation) {

	/*$scope.map = { center: { latitude: 51.5085300, longitude: -0.1257400 }, zoom: 8 };
	   $scope.$on('$ionicView.enter', function(){
        var pos;
        if(!!navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {        
            pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            });
        var mapOptions = {
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };        



        var map = new google.maps.Map(document.getElementById('map-container'), mapOptions);       

        navigator.geolocation.getCurrentPosition(function(position) {        
            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);            
            map.setCenter(geolocate);
            var marker = new google.maps.Marker({
            position: geolocate,
            map: map,
        });
    });
        
    } 
    else {
       document.alert("No maps support")
    }
    });*/

	var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map-container"), mapOptions);

    var marker = new google.maps.Marker({
		position: latLng,
	    map: $scope.map	 
	 });
 
  	}, function(error){
   		console.log("Could not get location");
  	});


	
})


