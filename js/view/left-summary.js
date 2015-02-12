define([], function() {

    var LeftSummary = function(container, lang, model) {
        container.find("h5").html(lang.mydinner.HEADER);
        container.find("label").html(lang.mydinner.PEOPLE);
        container.find("#guests").val(model.guests);

        container.find("thead td:first").html(lang.mydinner.DISH_NAME);
        container.find("thead td:last").html(lang.mydinner.COST);
        addMenuElements(container.find("tbody"),lang, model);

        container.find("tfoot").html("<td></td>\n<td>" + lang.general.currency(
            model.getTotalMenuPrice()) + "</td>");

        container.find("#confirm-dinner").html(lang.label.CONFIRM_DINNER);
    };

    var addMenuElements = function(tbody, lang, model) {
        tbody.html("");
        for (key in model.menu) {
            var dish = model.menu[key];
            if (!dish) {continue;}
            addMenuElement(tbody, dish.name, model.getDishPrice(dish.id));
        }
    };

    var addMenuElement = function(tbody, name, price) {
        var $name = $('<td>').html(name),
            $price = $('<td>').html(price),
            $row = $('<tr>').append($name).append($price);
        tbody.append($row);
    };
    return LeftSummary;
});
