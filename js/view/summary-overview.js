define([], function() {

    var SummaryOverviewView = function(container, lang, model) {
        var row = container.find(".row");
        row.html("");
        for (key in model.menu) {
            var dish = model.menu[key];
            if (!dish) {continue;} // dish might be null
            row.append(createDishElement('images/' + dish.image,
                                         model.getIngredientsPrice(dish["ingredients"]), lang));
        }
        row.append(createTotalElement(model.getTotalMenuPrice(), lang));

        container.find(".print-btn").html(lang.label.PRINT_FULL_RECIPE);
    };

    var createDishElement = function(imgSrc, price, lang) {
        //console.log("price", price);
        var img = $('<img>').attr('src', imgSrc),
            figcaption = $('<figcaption>').html(lang.general.currency(price)),
            div = $('<div>').addClass('dish-summary col-md-3').append(img).append(figcaption);
        return div;
    };

    var createTotalElement = function(totalSum, lang) {
        var div = $('<div>').html('<p><b>'+ lang.summary_overview.TOTAL_EQ + " " + lang.general.currency(totalSum));
        return div;
    };

    return SummaryOverviewView;
});
