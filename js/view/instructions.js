/**
 * Created by Fredrik on 2015-02-12.
 */
define([], function() {

    var InstructionsView = function(container, lang, model) {
        container.html("");
        for (key in model.menu) {
            var dish = model.menu[key];
            if (!dish) {continue;} // dish might be null
            container.append(
                createDishElement(
                    'images/' + dish.image,
                    dish.name,
                    dish.description,
                    dish.description,
                    lang));
        }
    };

    var createDishElement = function(imgSrc, name, description, preparation, lang) {
        var img = $('<img>').attr('src', imgSrc),
            figcaption = $('<figcaption>').html(name),
            div = $('<div>').addClass('dish-info'),
            desc = $('<div>').addClass('margin-down'),
            d1 = $('<div>').addClass('dish-image col-md-2').append(img).append(figcaption),
            d2 = $('<div>').addClass('dish-name col-md-4').append($('<h5>').html(name)).append(
                    $('<p>').html(description)),
            prep = $('<div>').addClass('col-md-4 container margin-down').append(
                $('<h5>').html(lang.dishdetails.PREPARATION_HEADER)).append(
                $('<p>').html(preparation));

            desc.append(d1).append(d2);

            div.append(desc).append(prep);

        return div;
    };

    InstructionsView.prototype.show = function() {

    };
    return InstructionsView;
});
