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

.controller('runCtrl', function($scope) {
 $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
})

.controller('workoutDetailCtrl', function($scope) {
$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
})
