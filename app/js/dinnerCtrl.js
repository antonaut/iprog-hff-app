// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function(lang, $scope, Dinner) {
    $scope.lang = lang;
    $scope.total = function() { return Dinner.getTotalMenuPrice()*Dinner.guests; };

    $scope.numberOfGuests=Dinner.guests;


    $scope.getPrice = function(dish){
        console.log(dish.Ingredients);
        return Dinner.getIngredientsPrice(dish.Ingredients)*Dinner.guests;
    };


    $scope.getMenu = function(){
        console.log(Dinner.menu);
        var dishes = [];
        for (key in Dinner.menu) {
            if(Dinner.menu[key]) {
                dishes.push(Dinner.menu[key]);
            }
        }
        return dishes;
    };

    $scope.addDishToMenu = function(id){
        Dinner.addDishToMenu(id);
    };
    
    $scope.setNumberOfGuests = function(number) {
        Dinner.guests = number;
    };

    $scope.getNumberOfGuests = function() {
        return Dinner.guests;
    };

    // TODO in Lab 5: Implement the methods to get the dinner menu
    // add dish to menu and get total menu price

});