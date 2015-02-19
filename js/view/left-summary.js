define([], function() {

    var LeftSummary = function(container, lang, model, controller) {
        this.container=container;
        this.lang=lang;
        this.model=model;
        this.controller=controller;

        this.update();
    };

    LeftSummary.prototype.update = function() {
        this.container.find("h5").html(this.lang.mydinner.HEADER);
        this.container.find("label").html(this.lang.mydinner.PEOPLE);
        var guestsField=this.container.find("#guests");

        guestsField.val(this.model.guests);

        this.container.find("thead td:first").html(this.lang.mydinner.DISH_NAME);
        this.container.find("thead td:last").html(this.lang.mydinner.COST);
        addMenuElements(this.container.find("tbody"),this.lang, this.model);

        this.container.find("tfoot").html("<td></td>\n<td>" + this.lang.general.currency(
            this.model.getTotalMenuPrice()*this.model.guests) + "</td>");

        this.container.find("#confirm-dinner").html(this.lang.label.CONFIRM_DINNER);
    };

    var addMenuElements = function(tbody, lang, model) {
        tbody.html("");
        for (key in model.menu) {
            var dish = model.menu[key];
            if (!dish) {continue;}
            addMenuElement(tbody, dish.name, model.getDishPrice(dish.id)*model.guests);
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
