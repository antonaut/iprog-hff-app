// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner', function ($resource) {
  
  
    // DinnerModel Object constructor
    var DinnerModel = function () {
        this._BIGOVEN_API_KEY = "dvxs43ivV0m01bbwu7u3C0dAE12md87W";

        this._guests = 1; // Number of guests at party
        this._selectedDish = null; // The currently selected dish
        this._currentDish = null;

        // The dinner menu of the party
        this._menu = {
            "Salad": null,
            "Main Dish": null,
            "Dessert": null
        };

        this._observers = [];

        this._lastSearch=[];

        this.dishes = {};

        this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:this._BIGOVEN_API_KEY});
        this.Dish = $resource('http://api.bigoven.com/recipe/:id',{id:'@id',api_key:this._BIGOVEN_API_KEY});
    };

    DinnerModel.prototype.addObserver = function(callback) {
        this._observers.push(callback);
    };

    DinnerModel.prototype.notifyObservers = function(obj) {
        for(index in this._observers){
            this._observers[index](obj); // Call callback
        }
    }


    Object.defineProperty(DinnerModel.prototype, "guests", {
        get: function () {
            return this._guests;
        },
        set: function (guests) {
            if (!guests || typeof guests !== "number" || guests < 0) {
                throw "Unexpected input : " + guests;
            }
            this._guests = guests;
        }
    });

    Object.defineProperty(DinnerModel.prototype, "selectedDish", {
        get: function () {
            return this._selectedDish;
        },
        set: function (selectedDish) {
            this._selectedDish = selectedDish;
        }
    });


    // Returns all the dishes on the menu as an object:
    // Example:
    //  var menu = {
    //     "starter": { "id": 101, "description": "lol i can has", ... },
    //     "main dish": null,
    //     "dessert": null
    //  }
    Object.defineProperty(DinnerModel.prototype, "menu", {
        get: function () {
            return this._menu;
        }
    });


    // Returns all ingredients for all the dishes on the menu.
    DinnerModel.prototype.getAllIngredients = function () {
        var ingredients = [];
        if (this.menu["starter"]) {
            var dish_id = this.menu["starter"]["RecipeID"];
            ingredients = ingredients.concat(this._getIngredientsFromDish(dish_id));
        }

        if (this.menu["main dish"]) {
            var dish_id = this.menu["main dish"]["RecipeID"];
            ingredients = ingredients.concat(this._getIngredientsFromDish(dish_id));
        }

        if (this.menu["dessert"]) {
            var dish_id = this.menu["dessert"]["RecipeID"];
            ingredients = ingredients.concat(this._getIngredientsFromDish(dish_id));
        }

        return ingredients;
    };

    // Throws if the id"s doesnt exist
    // Returns an array with ingredients (or the empty array).
    DinnerModel.prototype._getIngredientsFromDish = function (id) {
        var dish = this.getDish(id);
        if (!dish) {
            throw "Couldn\"t find dish with id: " + id;
        }
        if (!dish.ingredients) {
            return [];
        }
        return dish.ingredients;
    };

    // Returns the total price of the menu (all the ingredients multiplied by number of guests).
    DinnerModel.prototype.getTotalMenuPrice = function () {
        var tot = 0;
        for (key in this.menu) {
            if (this.menu[key]) {
                tot += this.getIngredientsPrice(this.menu[key]["Ingredients"]);
            }
        }
        return tot;
    };

    DinnerModel.prototype.getIngredientsPrice = function (ingredients) {
        var defaultSum = 0;
        if (!ingredients || !Object.hasOwnProperty("length", ingredients)) {
            // How should one type check for arrays?
            throw 'Unexpected type of ingredients: ' + ingredients;
        }
        return ingredients.reduce(function (prev, current) {
            return prev + current["Quantity"];
        }, defaultSum);
    };

    DinnerModel.prototype.getDishPrice = function (id) {
        return this.getIngredientsPrice(this.dishes[id].Ingredients);
    };

    // Adds the passed dish to the menu. If the dish of that type already exists on the menu
    // it is removed from the menu and the new one added.
    DinnerModel.prototype.addDishToMenu = function (id) {
        var dish = this.getDish(id);
        if (!dish) {
            throw "No dish with id: " + id;
        }
        var type = dish["Category"];
        this.menu[type] = dish;
    };

// Removes dish from menu
    DinnerModel.prototype.removeDishFromMenu = function (id) {
        var dish_type_to_remove = undefined; // id not set
        for (dish_type in this.menu) {
            var dish_id = this.menu[dish_type]["RecipeID"];
            if (dish_id === id) {
                dish_type_to_remove = dish_type;
            }
        }

        if (dish_type_to_remove) {
            this.menu[dish_type_to_remove] = null;
            return;
        }

        throw "No dish in menu with id: " + id;
    };

// Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
// You can use the filter argument to filter out the dish by name or ingredient (use for search).
// If you don"t pass any filter all the dishes will be returned.
    DinnerModel.prototype.getSearchResult = function () {
        return(this._lastSearch);
    };

    DinnerModel.prototype.searchForDishes= function (type, filter) {
        var url = "http://api.bigoven.com/recipes?api_key="+this._BIGOVEN_API_KEY+"&pg=1&rpp=50";
        if(type){
            url += "&include_primarycat="+type;
        }
        if(filter){
            url+="&any_kw="+filter;
        }
        $.ajax({
            type: "GET",
            headers: {
                Accept : "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
            },
            cache: false,
            url: url,
            success: (function(data){
                this._lastSearch=data["Results"];
                data["Results"].forEach((function(obj){
                    if (!this.dishes[obj["RecipeID"]]) {
                        this.dishes[obj["RecipeID"]] = obj;
                    }
                }).bind(this));
                //console.log(this._lastSearch);
                this.notifyObservers();
            }).bind(this),
            error: (function(){
                $.notify("Unable to find dishes. Please check your internet connection.", {className: 'error', globalPosition: 'top center' });
            }).bind(this)

        });
    };

    DinnerModel.prototype.getSelectedDish = function() {
        return this.dishes[this.selectedDish];
    };

    DinnerModel.prototype.getDish = function(dishID, callback){
        if (this.dishes[dishID] && this.dishes[dishID]['Ingredients']) {
            if (callback) return callback(this.dishes[dishID]);
            else { return this.dishes[dishID]; }
        }
        this.Dish.get({
            id: dishID
        }, (function(obj){
            if (!this.dishes[obj["RecipeID"]]) {
                this.dishes[obj["RecipeID"]] = obj;
            }
            for (key in obj) {
                if (!this.dishes[obj["RecipeID"]][key]) {
                    this.dishes[obj["RecipeID"]][key] = obj[key];
                }
            }
            if(callback){
                callback(this.dishes[dishID]);
            }
        }).bind(this));
        /*$.ajax({
            type: "GET",
            headers: {
                Accept : "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
            },
            cache: false,
            url: url,
            success: (function(obj){
                if (!this.dishes[obj["RecipeID"]]) {
                    this.dishes[obj["RecipeID"]] = obj;
                }
                for (key in obj) {
                    if (!this.dishes[obj["RecipeID"]][key]) {
                        this.dishes[obj["RecipeID"]][key] = obj[key];
                    }
                }

                this.notifyObservers();
                if (callback)
                    callback(obj);
            }).bind(this),
            error: (function(){
                $.notify("Unable to find dishes. Please check your internet connection.",{className: 'error', globalPosition: 'top center' });
            }).bind(this)
        });*/
    };

    DinnerModel.prototype.getCurrentDish = function(){
        return this._currentDish;
    };



  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return new DinnerModel();

});
