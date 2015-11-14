var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl:'pages/home.htm',
			controller: 'homeCtrl'
		})
		.when('/forecast', {
			templateUrl : 'pages/forecast.htm',
			controller: 'forecastCtrl'
		})
		.otherwise( {
			templateUrl:'pages/home.htm',
			controller: 'homeCtrl'
		});
});

//SERVICES
weatherApp.service('forecastService', function(){

	var self = this;
	this.city = '';

	// this.getCity = function(){
	// 	return self.city;
	// };
});

//CONTROLLERS
weatherApp.controller('homeCtrl', ['$scope','forecastService', function($scope,forecastService){
	 $scope.city = forecastService.city;

	 $scope.$watch('city', function(){
	 	forecastService.city = $scope.city;
	 });

}]);

weatherApp.controller('forecastCtrl', ['$scope','forecastService', function($scope, forecastService){
	$scope.city=forecastService.city;
}]);
