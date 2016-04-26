
angular
    .module('GMBApp')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider      
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'views/search.html'
            })
            .state('details', {
        	    url: '/details',
        	    templateUrl: 'views/details.html'
            });
        $urlRouterProvider.otherwise('/home');   
}]);