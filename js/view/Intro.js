/**
 * Created by Fredrik on 2015-02-10.
 */
define(['model/lang_en'], function (appdata) {
    var IntroView = function (container) {
        container.children("h4").html(appdata.intro.HEADER);
        container.children("p").html(appdata.intro.DESC);
        container.children("label").html(appdata.label.START_QUICKLY);
        container.children("button").html(appdata.label.NEW_DINNER);

    };
    return IntroView;
});