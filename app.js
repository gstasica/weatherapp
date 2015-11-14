var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl:'pages/home.htm',
			controller: 'homeCtrl'
		})
		.when('/forecast', {
			templateUrl : 'pages/forecast.htm',
			controller: 'forecastCtrl'
		});
});

weatherApp.controller('homeCtrl', ['$scope', function($scope){
	$scope.city='';
}]);

weatherApp.controller('forecastCtrl', ['$scope', function($scope){
	$scope.city='';
}]);