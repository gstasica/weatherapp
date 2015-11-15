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
		.when('/forecast/:days', {
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
	this.city = 'Zywiec';

});

//CONTROLLERS
weatherApp.controller('homeCtrl', ['$scope','forecastService', function($scope,forecastService){
	 $scope.city = forecastService.city;

	 $scope.$watch('city', function(){
	 	forecastService.city = $scope.city;
	 });

}]);

weatherApp.controller('forecastCtrl', ['$scope','$routeParams','$resource','forecastService', function($scope, $routeParams, $resource, forecastService){
	$scope.city = forecastService.city;
	$scope.days = $routeParams.days || '2'
	
	$scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
		{ callback : 'JSON_CALLBACK' }, { get: { method : 'JSONP' } });

	$scope.weatherResult = $scope.weatherApi.get({
		q : $scope.city,
		cnt: $scope.days,
		//the appId should be replaced with a one that you got after registering at http://api.openweathermap.org/
		appid:'2de143494c0b295cca9337e1e96b00e0'
	});

	$scope.convertToCel = function(degK){
		return Math.round(100 * (degK - 273.15)/100);
	};

	$scope.convertToDate = function(dt){
		return new Date(dt * 1000);
	};
}]);
