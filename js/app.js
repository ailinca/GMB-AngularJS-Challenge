'use strict';

var app = angular.module('GMBApp', ['ui.router']);
 
 
 app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider      
        
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        
        .state('search', {
            url: '/search',
            templateUrl: 'search.html'
        });
 }]);


app.service("storeItem", function(){
  	var savedItems = [];

  	this.saveItem = function(item){
    	savedItems.push(item);
  	};

  	this.getSavedItems = function(){
    	return savedItems;
  	}
});


app.controller('GMBController', ['$scope','$state', '$http', 'storeItem', function($scope, $state, $http, storeItem){
	
	$scope.appId = "193105c8";
	$scope.appKey = "49578ed35802672737b9b958cd2c0247";
	
	$scope.itemToAdd = {};
	$scope.savedItems = storeItem.getSavedItems();

	$scope.searchItem = '';


    function fetch(food) {
      $http.get("https://api.nutritionix.com/v1_1/search/" + food + "?results=0:30&fields=item_name,brand_name,nf_calories,nf_protein&appId=193105c8&appKey=49578ed35802672737b9b958cd2c0247")
        .then(function(response) {
          $scope.results = response.data;
        });
    }
    $scope.fetch = fetch;

    function addItem(result) {
    	$scope.itemToAdd.item_name = result.fields.item_name;
    	$scope.itemToAdd.brand_name = result.fields.brand_name;
    	$scope.itemToAdd.nf_calories = result.fields.nf_calories;
    	$scope.itemToAdd.nf_protein = result.fields.nf_protein;

    	storeItem.saveItem($scope.itemToAdd);
    	
    	$state.go('home');
    	
    }
    $scope.addItem = addItem;
}]);