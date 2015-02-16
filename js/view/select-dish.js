define([], function() {

    var SelectDish = function (container, lang, model, selectDishController, pageController) {
        this.container = container;
        this.lang = lang;
        this.model = model;
        this.selectDishController = selectDishController;
        this.pageController = pageController;
        this.dishList = this.container.find("#dish-list");

        this.update();
    };

    SelectDish.prototype.update = function(){
        this.container.find("h5").html(this.lang.selectdish.HEADER);
        this.container.find("input[type=search]").attr('placeholder', this.lang.selectdish.PLACEHOLDER);
        this.container.find("button").html(this.lang.label.SEARCH).click(
            (function(evt){
                var filterString = $('.search input').val();
                var dishType = $('#dish-type').val();
                this.searchAndFilter(dishType, filterString);
                evt.preventDefault();
            }).bind(this)
        );
        var starter = $("<option>").html(this.lang.dishinfo.STARTER);
        var main_course = $("<option>").html(this.lang.dishinfo.MAIN_COURSE);
        var desert = $("<option>").html(this.lang.dishinfo.DESERT);
        var sel = this.container.find("select").html("");
            sel.append(starter).append(main_course).append(desert);

        this.searchAndFilter("starter");
    };


    SelectDish.prototype.searchAndFilter = function(type, filter) {
        this.dishList.html("");
        var dishes = this.model.getAllDishes(type, filter);
        $.each(dishes,(function(index, dish){
            this.addDish(this.dishList,
                    dish.id,
                    dish.name,
                    dish.image,
                    dish.description);
        }).bind(this));
    };

    SelectDish.prototype.addDish = function(dishList, id, name, image, description) {

        var $image = $('<img>').attr('src','images/'+image).addClass('img-thumbnail').click(
                (function(){
                    this.selectDishController.setSelectedDish(id);
                    this.pageController.goToSingleDish();
                }).bind(this)),
            $name = $('<figcaption>').html(name),
            $description = $('<p>').html(description),
            $row = $('<div>').append($image).append($name).append($description).addClass('dish col-md-2');
        dishList.append($row);
    };

    return SelectDish;
});
