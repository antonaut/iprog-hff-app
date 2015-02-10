/**
 * Created by Fredrik on 2015-02-10.
 */
define(['model/lang_en'], function (lang) {
    var intro = function (container) {
        container.children("h4").html(lang.intro.HEADER);
        container.children("p").html(lang.intro.DESC);
        container.children("label").html(lang.label.START_QUICKLY);
        container.children("button").html(lang.label.NEW_DINNER);

    };
    return intro;
});
