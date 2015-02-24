/**
 * Created by Fredrik on 2015-02-19.
 */
define([], function() {
    var SingleDishController = function(model, PageController) {
        this.model=model;

        $('#ingredient-list button').click((function(){
            this.model.addDishToMenu(this.model.selectedDish);
            this.model.selectedDish = null;
            this.model.notifyObservers();
            PageController.goToSelectDish();
        }).bind(this));

        $('#dish-details button').click((function() {
            this.model.selectedDish = null;
            PageController.back();
        }).bind(this));
    };

    SingleDishController.prototype.attachView=function(view){
        this.view = view;
    };


    return SingleDishController;
});