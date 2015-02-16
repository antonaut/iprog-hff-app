/**
 * Created by Fredrik on 2015-02-12.
 */
define([], function() {

    var SingleDishView = function(container, lang, model) {
        this.container = container;
        this.lang = lang;
        this.model = model;

        this.update();
    };

    SingleDishView.prototype.update = function(){
        var dish = this.model.getDish(this.model.selectedDish);
        this.container.find("h5:first").html(dish.name);
        this.container.find("img").attr('src', 'images/'+dish.image);
        this.container.find(".single-dish-description").html(dish.description);
        this.container.find(".single-dish-preparation").html(dish.description);
        this.container.find("#dish-details button").html(this.lang.label.BACK_TO_SELECT);
        this.container.find("h5:nth(1)").html(this.lang.dishdetails.PREPARATION_HEADER);

        this.container.find("thead td").html(this.lang.dishdetails.ingredients_header(this.model.guests));
        addMenuElements(this.container.find("tbody"),dish,this.lang,this.model);
        this.container.find("tfoot button").html(this.lang.label.CONFIRM_DISH);
        this.container.find("tfoot td:nth(1)").html(this.lang.general.currency(this.model.getDishPrice(dish.id)*this.model.guests));
    };


    var addMenuElements = function(tbody,dish, lang, model) {
        tbody.html("");        
        for (idx in dish.ingredients) {
            var ingredient = dish.ingredients[idx];
            if (!ingredient) {continue;}
            addMenuElement(tbody,
                model.guests*ingredient.quantity + " " + ingredient.unit,
                ingredient.name,
                lang.general.currency(model.guests*ingredient.price));
        }
    };

    var addMenuElement = function(tbody, quantity, name,price) {
        var $quantity = $('<td>').html(quantity),
            $name = $('<td>').html(name),
            $price = $('<td>').html(price),
            $row = $('<tr>').append($quantity).append($name).append($price);
        tbody.append($row);
    };

    return SingleDishView;
});
