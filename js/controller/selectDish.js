/**
 * Created by Fredrik on 2015-02-16.
 */
define([], function() {
    var SelectDishController = function(model, pageController) {
        this.model=model;
        this.pageController = pageController;
    };

    SelectDishController.prototype.attachView = function(view) {
        this.view = view;
    };

    SelectDishController.prototype.setSelectedDish = function(dish_id) {
        this.model.selectedDish = dish_id;

        this.model.getDish(dish_id, (function() {
            this.pageController.goToSingleDish();
        }).bind(this));
    };




    return SelectDishController;
});