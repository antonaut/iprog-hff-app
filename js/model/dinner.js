define([], function () {

// DinnerModel Object constructor
    var DinnerModel = function (name, guests) {
        this._name = name;
        this._guests = guests; // Number of guests at party
        this._selectedDish = null; // The currently selected dish

        // The dinner menu of the party
        this._menu = {
            "starter": null,
            "main dish": null,
            "dessert": null
        };
    };

    Object.defineProperty(DinnerModel.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            if (!name || typeof name !== "string" || name.length < 1) {
                throw "Unexpected input: " + name;
            }
            this._name = name;
        }
    });


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
            var dish_id = this.menu["starter"].id;
            ingredients = ingredients.concat(this._getIngredientsFromDish(dish_id));
        }

        if (this.menu["main dish"]) {
            var dish_id = this.menu["main dish"].id;
            ingredients = ingredients.concat(this._getIngredientsFromDish(dish_id));
        }

        if (this.menu["dessert"]) {
            var dish_id = this.menu["dessert"].id;
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
        var ingredients = this.getAllIngredients();
        return this.getIngredientsPrice(ingredients);
    };

    DinnerModel.prototype.getIngredientsPrice = function (ingredients) {
        var defaultSum = 0;
        if (!ingredients || !Object.hasOwnProperty("length", ingredients)) {
            // How should one type check for arrays?
            throw 'Unexpected type of ingredients: ' + ingredients;
        }
        return ingredients.reduce(function (prev, current) {
            return prev + current["price"];
        }, defaultSum);
    };

    DinnerModel.prototype.getDishPrice = function (id) {
        return this.getIngredientsPrice(this.getDish(id).ingredients);
    };

// Adds the passed dish to the menu. If the dish of that type already exists on the menu
// it is removed from the menu and the new one added.
    DinnerModel.prototype.addDishToMenu = function (id) {
        var dish = this.getDish(id);
        if (!dish) {
            throw "No dish with id: " + id;
        }
        var type = dish["type"];
        this.menu[type] = dish;
    };

// Removes dish from menu
    DinnerModel.prototype.removeDishFromMenu = function (id) {
        var dish_type_to_remove = undefined; // id not set
        for (dish_type in this.menu) {
            var dish_id = this.menu[dish_type].id;
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
    DinnerModel.prototype.getAllDishes = function (type, filter) {
        return $(dishes).filter(function (index, dish) {
            var found = true;
            if (filter) {
                found = false;
                $.each(dish.ingredients, function (index, ingredient) {
                    if (ingredient.name.indexOf(filter) != -1) {
                        found = true;
                    }
                });
                if (dish.name.indexOf(filter) != -1) {
                    found = true;
                }
            }
            return dish.type == type && found;
        });
    };

// Returns a dish of specific ID.
    DinnerModel.prototype.getDish = function (id) {
        for (key in dishes) {
            if (dishes[key].id == id) {
                return dishes[key];
            }
        }
    };



// The dishes variable contains an array of all the
// dishes in the database. Each dish has id, name, type,
// image (name of the image file), description and
// array of ingredients. Each ingredient has name,
// quantity (a number), price (a number) and unit (string
// defining the unit i.e. "g", "slices", "ml". Unit
// can sometimes be empty like in the example of eggs where
// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
    var dishes = [{
        "id": 1,
        "name": "French toast",
        "type": "starter",
        "image": "toast.jpg",
        "description": "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
        "ingredients": [{
            "name": "eggs",
            "quantity": 0.5,
            "unit": "",
            "price": 10
        }, {
            "name": "milk",
            "quantity": 30,
            "unit": "ml",
            "price": 6
        }, {
            "name": "brown sugar",
            "quantity": 7,
            "unit": "g",
            "price": 1
        }, {
            "name": "ground nutmeg",
            "quantity": 0.5,
            "unit": "g",
            "price": 12
        }, {
            "name": "white bread",
            "quantity": 2,
            "unit": "slices",
            "price": 2
        }]
    }, {
        "id": 2,
        "name": "Sourdough Starter",
        "type": "starter",
        "image": "sourdough.jpg",
        "description": "Here is how you make it... Lore ipsum...",
        "ingredients": [{
            "name": "active dry yeast",
            "quantity": 0.5,
            "unit": "g",
            "price": 4
        }, {
            "name": "warm water",
            "quantity": 30,
            "unit": "ml",
            "price": 0
        }, {
            "name": "all-purpose flour",
            "quantity": 15,
            "unit": "g",
            "price": 2
        }]
    }, {
        "id": 3,
        "name": "Baked Brie with Peaches",
        "type": "starter",
        "image": "bakedbrie.jpg",
        "description": "Here is how you make it... Lore ipsum...",
        "ingredients": [{
            "name": "round Brie cheese",
            "quantity": 10,
            "unit": "g",
            "price": 8
        }, {
            "name": "raspberry preserves",
            "quantity": 15,
            "unit": "g",
            "price": 10
        }, {
            "name": "peaches",
            "quantity": 1,
            "unit": "",
            "price": 4
        }]
    }, {
        "id": 100,
        "name": "Meat balls",
        "type": "main dish",
        "image": "meatballs.jpg",
        "description": "Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
        "ingredients": [{
            "name": "extra lean ground beef",
            "quantity": 115,
            "unit": "g",
            "price": 20
        }, {
            "name": "sea salt",
            "quantity": 0.7,
            "unit": "g",
            "price": 3
        }, {
            "name": "small onion, diced",
            "quantity": 0.25,
            "unit": "",
            "price": 2
        }, {
            "name": "garlic salt",
            "quantity": 0.7,
            "unit": "g",
            "price": 2
        }, {
            "name": "Italian seasoning",
            "quantity": 0.6,
            "unit": "g",
            "price": 3
        }, {
            "name": "dried oregano",
            "quantity": 0.3,
            "unit": "g",
            "price": 3
        }, {
            "name": "crushed red pepper flakes",
            "quantity": 0.6,
            "unit": "g",
            "price": 3
        }, {
            "name": "Worcestershire sauce",
            "quantity": 6,
            "unit": "ml",
            "price": 7
        }, {
            "name": "milk",
            "quantity": 20,
            "unit": "ml",
            "price": 4
        }, {
            "name": "grated Parmesan cheese",
            "quantity": 5,
            "unit": "g",
            "price": 8
        }, {
            "name": "seasoned bread crumbs",
            "quantity": 15,
            "unit": "g",
            "price": 4
        }]
    }, {
        "id": 101,
        "name": "MD 2",
        "type": "main dish",
        "image": "bakedbrie.jpg",
        "description": "Here is how you make it... Lore ipsum...",
        "ingredients": [{
            "name": "ingredient 1",
            "quantity": 1,
            "unit": "pieces",
            "price": 8
        }, {
            "name": "ingredient 2",
            "quantity": 15,
            "unit": "g",
            "price": 7
        }, {
            "name": "ingredient 3",
            "quantity": 10,
            "unit": "ml",
            "price": 4
        }]
    }, {
        "id": 102,
        "name": "MD 3",
        "type": "main dish",
        "image": "meatballs.jpg",
        "description": "Here is how you make it... Lore ipsum...",
        "ingredients": [{
            "name": "ingredient 1",
            "quantity": 2,
            "unit": "pieces",
            "price": 8
        }, {
            "name": "ingredient 2",
            "quantity": 10,
            "unit": "g",
            "price": 7
        }, {
            "name": "ingredient 3",
            "quantity": 5,
            "unit": "ml",
            "price": 4
        }]
    }, {
        "id": 102,
        "name": "MD 4",
        "type": "main dish",
        "image": "meatballs.jpg",
        "description": "Here is how you make it... Lore ipsum...",
        "ingredients": [{
            "name": "ingredient 1",
            "quantity": 1,
            "unit": "pieces",
            "price": 4
        }, {
            "name": "ingredient 2",
            "quantity": 12,
            "unit": "g",
            "price": 7
        }, {
            "name": "ingredient 3",
            "quantity": 6,
            "unit": "ml",
            "price": 4
        }]
    }, {
        "id": 200,
        "name": "Chocolat Ice cream",
        "type": "dessert",
        "image": "icecream.jpg",
        "description": "Here is how you make it... Lore ipsum...",
        "ingredients": [{
            "name": "ice cream",
            "quantity": 100,
            "unit": "ml",
            "price": 6
        }]
    }, {
        "id": 201,
        "name": "Vanilla Ice cream",
        "type": "dessert",
        "image": "icecream.jpg",
        "description": "Here is how you make it... Lore ipsum...",
        "ingredients": [{
            "name": "ice cream",
            "quantity": 100,
            "unit": "ml",
            "price": 6
        }]
    }, {
        "id": 202,
        "name": "Strawberry",
        "type": "dessert",
        "image": "icecream.jpg",
        "description": "Here is how you make it... Lore ipsum...",
        "ingredients": [{
            "name": "ice cream",
            "quantity": 100,
            "unit": "ml",
            "price": 6
        }]
    }
    ];

    return DinnerModel;
});
