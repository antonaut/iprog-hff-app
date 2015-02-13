/**
 * Created by Fredrik on 2015-02-12.
 */
define([], function() {

    var SingleDishView = function(container, lang, model) {
        var dish = model.getDish(model.selectedDish);
        container.find("h5:first").html(dish.name);
        container.find("img").attr('src', 'images/'+dish.image);
        container.find(".single-dish-description").html(dish.description);
        container.find(".single-dish-preparation").html(dish.description);
        container.find("#dish-details button").html(lang.label.BACK_TO_SELECT);
        container.find("h5:nth(1)").html(lang.dishdetails.PREPARATION_HEADER);

        container.find("thead td").html(lang.dishdetails.ingredients_header(model.guests));
        addMenuElements(container.find("tbody"),dish,lang,model);
        container.find("tfoot button").html(lang.label.CONFIRM_DISH);
        container.find("tfoot td:nth(1)").html(lang.general.currency(model.getDishPrice(dish.id)*model.guests));
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
