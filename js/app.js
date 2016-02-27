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
        })

        .state('details', {
        	url: '/details',
        	templateUrl: 'details.html'
        });
 }]);


app.service("storeItem", function(){
  	var savedItems = [];
  	var savedDetails = [];

  	this.saveItem = function(item) {
    	savedItems.push(item);
  	};

  	this.getSavedItems = function() {
    	return savedItems;
  	};

  	this.saveDetails = function(item) {
  		savedDetails.push(item);
  		console.log("s-a apelat saveDetails si acum in saveDetails avem:");
  		console.log(savedDetails);
  	};

  	this.getSavedDetails = function() {
  		return savedDetails;
  	};
});


app.controller('GMBController', ['$scope','$state', '$http', 'storeItem', function($scope, $state, $http, storeItem) {
	
	$scope.appId = "193105c8";
	$scope.appKey = "49578ed35802672737b9b958cd2c0247";
	
	$scope.itemToAdd = {};
	$scope.savedItems = storeItem.getSavedItems();
	$scope.savedDetails = storeItem.getSavedDetails();

	console.log("in $scope.savedDetails avem:");
	console.log($scope.savedDetails);
	console.log("in $scope.savedItems avem:");
	console.log($scope.savedItems);


	$scope.searchItem = '';


    function fetch(food) {
      $http.get("https://api.nutritionix.com/v1_1/search/" + food + "?results=0:30&fields=item_name,brand_name,nf_calories,nf_protein&appId="+ $scope.appId + "&appKey=" + $scope.appKey)
        .then(function(response) {
          $scope.results = response.data;
        });
    }
    $scope.fetch = fetch;

    function addItem(result) {
    	$scope.itemToAdd.item_id = result._id;

    	$scope.itemToAdd.item_name = result.fields.item_name;
    	$scope.itemToAdd.brand_name = result.fields.brand_name;
    	$scope.itemToAdd.nf_calories = result.fields.nf_calories;
    	$scope.itemToAdd.nf_protein = result.fields.nf_protein;

    	storeItem.saveItem($scope.itemToAdd);
    	
    	$state.go('home');
    	
    }
    $scope.addItem = addItem;

    function getDetails(itemID) {
    	$http.get("https://api.nutritionix.com/v1_1/item?id=" + itemID + "&appId="+ $scope.appId + "&appKey=" + $scope.appKey)
    	  .then(function(response){
    	  	$scope.itemDetails = response.data;
    	  	console.log("s-a facut cu succes get-ul detaliilor iar obiectul returnat e: ");
    	  	console.log($scope.itemDetails);
    	  	storeItem.saveDetails($scope.itemDetails);
    	  });
    	
    	$state.go('details');
    }
    $scope.getDetails = getDetails;

}]);