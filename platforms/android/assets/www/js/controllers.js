angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {

})

.controller('pollutionMapCtrl', function($scope) {
 /*$scope.map = { center: { latitude: 51.508742, longitude: -0.120850 }, zoom: 8 };
 $scope.updateMap = function (lat, lng) {
		$scope.map = { center: { latitude: lat, longitude: lng }, zoom: 15 };
 	}*/

 	 $scope.$on('mapInitialized', function(event, map) {
      map.setCenter(new google.maps.LatLng(51.5085300, -0.1257400));
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

.controller('runCtrl', function($scope) {
 $scope.map = { center: { latitude: 51.5085300, longitude: -0.1257400 }, zoom: 8 };
})

.controller('workoutDetailCtrl', function($scope) {

	$scope.map = { center: { latitude: 51.5085300, longitude: -0.1257400 }, zoom: 8 };
	
})


