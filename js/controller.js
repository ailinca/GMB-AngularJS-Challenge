function GMBController($state, $http) {
    
    var ctrl = this;

    ctrl.appId = "193105c8";
    ctrl.appKey = "49578ed35802672737b9b958cd2c0247";
    
    ctrl.savedItems = [];
    ctrl.itemDetails = {};

    ctrl.searchItem = '';

    ctrl.$state = $state;


    ctrl.fetch = function(food) {
        ctrl.results = {};
        $http.get("https://api.nutritionix.com/v1_1/search/" + food + "?results=0:30&fields=item_name,brand_name,nf_calories,nf_protein&appId="+ ctrl.appId + "&appKey=" + ctrl.appKey)
            .then(function(response) {
                ctrl.results = response.data;
            });
    };


    ctrl.addItem = function(result) {
        ctrl.itemToAdd = {};

        ctrl.itemToAdd.item_id = result._id;
        ctrl.itemToAdd.item_name = result.fields.item_name;
        ctrl.itemToAdd.brand_name = result.fields.brand_name;
        ctrl.itemToAdd.nf_calories = result.fields.nf_calories;
        ctrl.itemToAdd.nf_protein = result.fields.nf_protein;

        ctrl.savedItems.push(ctrl.itemToAdd);
        console.log("am adaugat la savedItems:", ctrl.itemToAdd);
        console.log("acum savedItems arata asa: ", ctrl.savedItems);

        $state.go('home');      
    };

    ctrl.getDetails = function(itemID) {
        $http.get("https://api.nutritionix.com/v1_1/item?id=" + itemID + "&appId="+ ctrl.appId + "&appKey=" + ctrl.appKey)
            .then(function(response) {
                ctrl.itemDetails = response.data;
                console.log("a fetchuit details:", ctrl.itemDetails);
            });
        $state.go('details');
    };

};


angular
    .module('GMBApp')
    .controller('GMBController', [
        '$state', 
        '$http', 
        GMBController
    ]); 