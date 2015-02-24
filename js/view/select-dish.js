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
        this.container.find("button").html(this.lang.label.SEARCH).click(this.adaptToChangedFilter.bind(this));

        var sel = this.container.find("select").html("");
        sel.change(this.adaptToChangedFilter.bind(this));

        var starter = $("<option>").attr('value',"starter").html(this.lang.dishinfo.STARTER);
        var main_course = $("<option>").attr('value',"main dish").html(this.lang.dishinfo.MAIN_COURSE);
        var desert = $("<option>").attr('value','dessert').html(this.lang.dishinfo.DESERT);



            sel.append(starter).append(main_course).append(desert);

        this.showLastSearchResults();
    };

    SelectDish.prototype.adaptToChangedFilter = function(evt){
        var filterString = $('.search input').val();
        var dishType = $('#dish-type').val();
        this.model.searchForDishes(dishType, filterString);

        evt.preventDefault();
    };


    SelectDish.prototype.showLastSearchResults = function() {
        this.dishList.html("");
        var dishes = this.model.getSearchResult();

        $.each(dishes,(function(index, dish){
            console.log(dish);
            this.addDish(this.dishList,
                    dish.RecipeID,
                    dish.Title,
                    dish.ImageURL120,
                    dish.description);
        }).bind(this));
    };

    SelectDish.prototype.addDish = function(dishList, id, name, image, description) {

        var $image = $('<img>').attr('src',image).addClass('img-thumbnail').click(
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
