angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    $scope.playing = false;
})

.controller('restaurantCtrl', function($scope) {
  $scope.restaurants = [
    {name: 'China', id: 1, address : 'kilo', image: 'img/1.jpg'},
    {name: 'Finland', id: 2, address : 'Sello', image: 'img/2.JPG'},
    {name: 'Turkey', id: 3, address : 'Kamppi', image: 'img/1.1.jpg'},
    {name: 'Vietnam', id: 4, address : 'Helsinki', image: 'img/1.1.jpg'},    
  ];
})

.controller('restaurantDetailCtrl', function($scope, $stateParams) {
  $scope.list = $stateParams.restaurantId;
});

