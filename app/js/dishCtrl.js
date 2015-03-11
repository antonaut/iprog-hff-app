// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function($scope, $routeParams, Dinner) {

  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  var dishName = $routeParams.dishId;


    Dinner.Dish.get({
    id: dishName
  }, function(data) {
    console.log(data);
    $scope.dish = data;
    //$scope.status = "Showing " + data.Results.length + " results";
  }, function(data) {
    $.notify("There was an error");
  });


});