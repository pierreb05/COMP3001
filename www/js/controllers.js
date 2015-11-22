angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {

})

.controller('pollutionMapCtrl', function($scope) {
 $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
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


.controller('LocationCtrl', function($scope){

    $scope.location = {};
    $scope.location.details = {};
		$scope.updateValues = function () {

    setTimeout(function () {
      $('#lat').val($scope.location.details.geometry.location.k);
      $('#lng').val($scope.location.details.geometry.location.D);
      console.log($scope.location);
    }, 150);

  }
   
  });