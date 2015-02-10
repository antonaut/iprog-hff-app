define([], function() {

    var SelectDish = function (container, lang) {
        container.find("h5").html(lang.selectdish.HEADER);
        container.find("input[type=search]").attr('placeholder', lang.selectdish.PLACEHOLDER);
        container.find("button").html(lang.label.SEARCH);
        var starter = $("<option>").html(lang.dishinfo.STARTER);
        var main_course = $("<option>").html(lang.dishinfo.MAIN_COURSE);
        var desert = $("<option>").html(lang.dishinfo.DESERT);
        container.find("select").append(starter).append(main_course).append(desert);
    };

    return SelectDish;
});
