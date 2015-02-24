define([], function() {

    var SelectDish = function (container, lang, model, selectDishController) {
        this.container = container;
        this.lang = lang;
        this.model = model;
        this.selectDishController = selectDishController;
        this.dishList = this.container.find("#dish-list");

        this.update();
    };

    SelectDish.prototype.update = function(){
        this.model.selectDish = null;
        this.container.find("h5").html(this.lang.selectdish.HEADER);
        this.container.find("input[type=search]").attr('placeholder', this.lang.selectdish.PLACEHOLDER);
        this.container.find("button").html(this.lang.label.SEARCH).click(this.adaptToChangedFilter.bind(this));

        var sel = this.container.find("select").html("");
        sel.change(this.adaptToChangedFilter.bind(this));

        var starter = $("<option>").attr('value',"Salad").html(this.lang.dishinfo.STARTER);
        var main_course = $("<option>").attr('value',"Main dish").html(this.lang.dishinfo.MAIN_COURSE);
        var desert = $("<option>").attr('value','Desserts').html(this.lang.dishinfo.DESERT);



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
        this.counter = -1;
        var dishes = this.model.getSearchResult();
        this.row = $('<div>').addClass("row");

        $.each(dishes,(function(index, dish){
            this.counter++;
            if (this.counter % 6 == 0) {
                this.dishList.append(this.row);
                this.row = $('<div>').addClass("row");
            }
            this.addDish(this.row,
                    dish.RecipeID,
                    dish.Title,
                    dish.ImageURL120,
                    dish.description);
        }).bind(this));

        this.dishList.append(this.row);
    };

    SelectDish.prototype.addDish = function(dishList, id, name, image, description) {

        var $image = $('<img>').attr('src',image).addClass('img-thumbnail').click(
                (function(){
                    $.notify(this.lang.general.LOADING, "info");
                    this.selectDishController.setSelectedDish(id);
                }).bind(this)).error(function(){
                    console.log("Exchanging image");
                    $(this).unbind("error").attr("src","images/recipe-no-image.jpg");
                }),
            $name = $('<figcaption>').html(name),
            $description = $('<p>').html(description),
            $row = $('<div>').append($image).append($name).append($description).addClass('dish col-md-2');
        dishList.append($row);
    };

    return SelectDish;
});
