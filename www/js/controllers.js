angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {

})

.controller('pollutionMapCtrl', function($scope) {
 $scope.map = { center: { latitude: 51.508742, longitude: -0.120850 }, zoom: 8 };
 $scope.updateMap = function (lat, lng) {
		$scope.map = { center: { latitude: lat, longitude: lng }, zoom: 15 };
 	}
})

.controller('settingsCtrl', function($scope) {

})

.controller('directionCtrl', function($scope) {
 $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
})

.controller('newWorkoutCtrl', function($scope) {

})

.controller('customWorkoutCtrl', function($scope) {

})

.controller('recapCtrl', function($scope) {

})

.controller('runCtrl', function($scope) {
 $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
})

.controller('workoutDetailCtrl', function($scope) {

	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
	
})


