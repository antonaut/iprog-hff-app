// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function(lang, $scope, Dinner) {
    $scope.lang = lang;
    $scope.total = Dinner.getTotalMenuPrice();

    $scope.numberOfGuests=1;

    $scope.menu = [];

    for (var i = Dinner.menu.length - 1; i >= 0; i--) {
        if (Dinner.menu[i]) {
            $scope.menu.push(Dinner.menu[i]);
        }
    };
    
    $scope.setNumberOfGuests = function(number) {
        Dinner.guests = number;
    }

    $scope.getNumberOfGuests = function() {
        return Dinner.guests;
    }

    // TODO in Lab 5: Implement the methods to get the dinner menu
    // add dish to menu and get total menu price

});