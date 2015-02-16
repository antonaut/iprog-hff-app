/**
 * Created by Fredrik on 2015-02-10.
 */
define([], function () {
    var intro = function (container, lang) {
        this.container=container;
        this.lang=lang;

        container.find("h4").html(lang.intro.HEADER);
        container.find("p").html(lang.intro.DESC);
        container.find("label").html(lang.label.START_QUICKLY);
        container.find("button").html(lang.label.NEW_DINNER);

    };
    return intro;
});
