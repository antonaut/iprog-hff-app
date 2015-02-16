define([], function() {

    var MyDinner = function(container, lang) {
        this.container = container;
        this.lang = lang;

        container.find("h2").html(lang.mydinner.HEADER);
        container.find("button").html(lang.label.BACK_TO_EDIT);

    };

    return MyDinner;
});