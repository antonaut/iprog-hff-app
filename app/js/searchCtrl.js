// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function(lang, $scope, Dinner, $rootScope) {
    var lang = $rootScope.lang;
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
        Dinner.DishSearch.get(q,
            function(data) {
                $scope.dishes = data.Results;
                $scope.status = "Showing " + data.Results.length + " results";
            },
            function(data) {
                $scope.status = "There was an error";
            });
    };

    $scope.dishTypes = [{
        "name": lang.dishinfo.STARTER,
        "value": "salad"
    }, {
        "name": lang.dishinfo.MAIN_COURSE,
        "value": "main dish"
    }, {
        "name": lang.dishinfo.DESSERT,
        "value": "dessert"
    }];
});