/**
 * Created by Fredrik on 2015-02-19.
 */
define([], function(){
    var SingleDishController = function(model) {
        this.model=model;

        console.log(this.model);

        $('#ingredient-list button').click((function(){
            this.model.addDishToMenu(this.model.selectedDish);
            this.view.update();
        }).bind(this));
    };

    SingleDishController.prototype.attachView=function(view){
        this.view=view;
    };




    return SingleDishController;
});