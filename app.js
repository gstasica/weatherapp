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
weatherApp.service('cityService', function(){

	var self = this;
	this.city = 'Zywiec';

});

weatherApp.service('forecastService', ['$resource', function($resource){

	// var self = this;
	
	var weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
		{ callback : 'JSON_CALLBACK' }, { get: { method : 'JSONP' } });

//weatherResult
	this.getForecast = function(city, days){
		return weatherApi.get({
			q : city,
			cnt: days,
			//the appId should be replaced with a one that you got after registering at http://api.openweathermap.org/
			appid:'2de143494c0b295cca9337e1e96b00e0'
		});
	};
}]);

//CONTROLLERS
weatherApp.controller('homeCtrl', ['$scope','$location','cityService', function($scope,$location, cityService){
	 $scope.city = cityService.city;

	 $scope.$watch('city', function(){
	 	cityService.city = $scope.city;
	 });

	 $scope.submit = function(){
	 	return $location.path('/forecast');
	 };

}]);

weatherApp.controller('forecastCtrl', ['$scope','$routeParams', 'cityService','forecastService', 
	function($scope, $routeParams, cityService, forecastService){
	
	$scope.city = cityService.city;
	$scope.days = $routeParams.days || '2'
	
	$scope.weatherResult = forecastService.getForecast($scope.city, $scope.days);
	
	$scope.convertToCel = function(degK){
		return Math.round(100 * (degK - 273.15)/100);
	};

	$scope.convertToDate = function(dt){
		return new Date(dt * 1000);
	};
}]);

weatherApp.directive('weatherTag', function(){
	return {
		//only look for html elements
		restrict:'E',
		templateUrl:'tpl/search-result.htm',
		//use isolated scope,  we'll have to explicitely pass model from controller to direcive (good practice)
		scope: {
			//pass model
			weatherDay: '=',
			//pass functions
			convertToStandardDate : '&',
			convertToStandardTemp : '&',
			//pass as text
			dateFormat : '@'
		},
		//replaces custom tag with result
		replace:true
	};
});