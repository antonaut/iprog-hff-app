define([], function() {

    var LeftSummary = function(container, lang) {
        container.children("h5").html(lang.dishlist.HEADER);
        container.children("label").html(lang.dishlist.PEOPLE);

        container.find("thead td:first").html(lang.dishlist.DISH_NAME);
        container.find("thead td:last").html(lang.dishlist.COST);

        container.find("#confirm-dinner").html(lang.label.CONFIRM_DINNER);
    };

    return LeftSummary;
});
