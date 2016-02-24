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
            // we'll get to this in a bit       
        });
 }]);


    (function(){
    'use strict';
	var $ = jQuery;
	$.fn.extend({
		filterTable: function(){
			return this.each(function(){
				$(this).on('keyup', function(e){
					$('.filterTable_no_results').remove();
					var $this = $(this), 
                        search = $this.val().toLowerCase(), 
                        target = $this.attr('data-filters'), 
                        $target = $(target), 
                        $rows = $target.find('tbody tr');
                        
					if(search == '') {
						$rows.show(); 
					} else {
						$rows.each(function(){
							var $this = $(this);
							$this.text().toLowerCase().indexOf(search) === -1 ? $this.hide() : $this.show();
						})
						if($target.find('tbody tr:visible').size() === 0) {
							var col_count = $target.find('tr').first().find('td').size();
							var no_results = $('<tr class="filterTable_no_results"><td colspan="'+col_count+'">No results found</td></tr>')
							$target.find('tbody').append(no_results);
						}
					}
				});
			});
		}
	});
	$('[data-action="filter"]').filterTable(); 
})(jQuery); 
 
$(function(){
    // attach table filter plugin to inputs
	$('[data-action="filter"]').filterTable();
	
	$('.container').on('click', '.panel-heading span.filter', function(e){
		var $this = $(this), 
			$panel = $this.parents('.panel');
		
		$panel.find('.panel-body').slideDown("slow");
		if($this.css('display') != 'none') {
			$panel.find('.panel-body input').focus();
		}
	});
	$('[data-toggle="tooltip"]').tooltip();
})

app.controller('GMBController', ['$scope','$state', '$http', function($scope, $state, $http){
	
	$scope.appId = "193105c8";
	$scope.appKey = "49578ed35802672737b9b958cd2c0247";
	$scope.savedItems = [];
	$scope.itemToAdd = {};

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

    	$scope.savedItems.push($scope.itemToAdd);
    	$state.go('home');
    	console.log("s-a intrat in functie");
    	console.log($scope.savedItems);
    }
    $scope.addItem = addItem;
}]);