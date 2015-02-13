define([], function() {

    var SelectDish = function (container, lang,model) {
        container.find("h5").html(lang.selectdish.HEADER);
        container.find("input[type=search]").attr('placeholder', lang.selectdish.PLACEHOLDER);
        container.find("button").html(lang.label.SEARCH);
        var starter = $("<option>").html(lang.dishinfo.STARTER);
        var main_course = $("<option>").html(lang.dishinfo.MAIN_COURSE);
        var desert = $("<option>").html(lang.dishinfo.DESERT);
        container.find("select").append(starter).append(main_course).append(desert);

        addDishes(container.find("#dish-list"),lang,model,"starter");
    };

    var addDishes = function(dishList, lang, model,type,filter) {
        dishes=model.getAllDishes(type,filter);
        $.each(dishes,function(index,dish){
            addDish(dishList,dish.name,dish.image,dish.description);
        });
    };

    var addDish = function(dishList, name, image, description) {
        var $image = $('<img>').attr('src','images/'+image).addClass('img-thumbnail'),
            $name = $('<figcaption>').html(name),
            $description = $('<p>').html(description),
            $row = $('<div>').append($image).append($name).append($description).addClass('dish col-md-2');
        dishList.append($row);
    };

    return SelectDish;
});
