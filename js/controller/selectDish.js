/**
 * Created by Fredrik on 2015-02-16.
 */
define([], function() {
    var SelectDishController = function(model) {
        this.model=model;
    };

    SelectDishController.prototype.attachView = function(view) {
        this.view = view;
    };

    SelectDishController.prototype.setSelectedDish = function(dish_id) {
        this.model.selectedDish = dish_id;
        this.model.notifyObservers();
    };




    return SelectDishController;
});