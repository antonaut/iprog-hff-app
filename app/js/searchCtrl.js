// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function($scope, Dinner, $rootScope) {
    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.
    $scope.search = function() {
        
        var title = $scope.text;
        var primary_cat = $scope.selected.value;
        
        var q = {
            title_kw: title,
        };

        if (primary_cat) {
            q['include_primarycat'] = primary_cat;
        }

        $scope.status = "Searching...";
        Dinner.searchForDishes(title,primary_cat,
            function(data) {
                $scope.dishes = data.Results;
                $scope.status = "Showing " + data.Results.length + " results";
            },
            function(data) {
                $scope.status = "There was an error";
            });
    };

    $scope.getStarterLang = function() {
        return $rootScope.lang.dishinfo.STARTER;
    };

    $scope.getMainDishLang = function () {
        return $rootScope.lang.dishinfo.MAIN_COURSE;
    };

    $scope.getDessertLang= function() {
        return $rootScope.lang.dishinfo.DESSERT;
    };


    $scope.dishTypes = [{
        "name": $scope.getStarterLang(),
        "value": "salad"
    }, {
        "name": $scope.getMainDishLang(),
        "value": "main dish"
    }, {
        "name": $scope.getDessertLang(),
        "value": "dessert"
    }];

    $scope.selected = $scope.dishTypes[0];
});