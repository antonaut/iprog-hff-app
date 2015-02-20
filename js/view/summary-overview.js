define([], function() {

    var SummaryOverviewView = function(container, lang, model) {
        this.container = container;
        this.lang = lang;
        this.model = model;

        this.update();
    };

    SummaryOverviewView.prototype.update = function(){
        var row = this.container.find(".row");
        row.html("");
        for (key in this.model.menu) {
            var dish = this.model.menu[key];
            if (!dish) {continue;} // dish might be null
            row.append(createDishElement('images/' + dish.image,
                this.model.getIngredientsPrice(dish["ingredients"])*this.model.guests, this.lang));
        }
        row.append(createTotalElement(this.model.getTotalMenuPrice()*this.model.guests, this.lang));

        this.container.find(".print-btn").html(this.lang.label.PRINT_FULL_RECIPE);
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
