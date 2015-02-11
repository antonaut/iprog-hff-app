/**
 * Created by Fredrik on 2015-02-10.
 */

define([], function () {

    language = {};

    language.header = {};
    language.header.HEADER = "HOMELETTE";
    language.header.TAGLINE = "From the best chefs in the world directly into your kitchen";

    language.general = {};
    language.general.currency = function(crowns) { return "SEK " + crowns; };

    language.intro = {};
    language.intro.HEADER = "A home dinner service";
    language.intro.DESC = "Muutakin suuresta maailman ja no jokainen. Jolla ei mutta tahan ai he. En ne katsoi paahan kerran ai tyhjan hauska he. Huulilla jos oma kaikkien israelin nyt han saavansa. Rakentaa pelastaa metsassa vaativat ole luo jokainen. Kullakin ruuhessa te nostivat tarkkaan ja varmasti se jo vaikenee. Huumannut kuitenkin millainen et ai jo sylyyksen kastettua ikkunasta. ";

    language.dishinfo = {};
    language.dishinfo.STARTER = "Starter";
    language.dishinfo.MAIN_COURSE = "Main";
    language.dishinfo.DESERT = "Dessert";

    language.label = {};
    language.label.START_QUICKLY = "start quickly";
    language.label.NEW_DINNER = "Create new dinner";
    language.label.SEARCH = "Search";
    language.label.SEARCH_DEFAULT_TEXT = "Enter key words";
    language.label.CONFIRM_DINNER = "Confirm dinner";
    language.label.CONFIRM_DISH = "Confirm dish";
    language.label.BACK_TO_SELECT = "Back to select dish";
    language.label.BACK_TO_EDIT = "Back to edit dinner";
    language.label.PRINT_RECIPE = "Print recipe";
    language.label.PRINT_FULL_RECIPE = "Print full recipe";

    language.dishlist = {};
    language.dishlist.HEADER = "My Dinner";
    language.dishlist.PEOPLE = "People";
    language.dishlist.DISH_NAME = "Dish name";
    language.dishlist.COST = "Cost";
    language.dishlist.PENDING = "Pending";


    language.selectdish = {};
    language.selectdish.HEADER = "SELECT DISH";
    language.selectdish.PLACEHOLDER = "Mmm... Pancakes!";

    language.dishdetails = {};
    language.dishdetails.ingredients_header = function (numberOfPeople) {return "INGREDIENTS FOR " + numberOfPeople + " PEOPLE";};
    language.dishdetails.PREPARATION_HEADER = "Preparation";

    language.dinner_overview= {};
    language.dinner_overview.header =  function (numberOfPeople) {return "My dinner: "+numberOfPeople+ " PEOPLE";};

    language.summary_overview = {};
    language.summary_overview.TOTAL_EQ = "TOTAL:";

    return language;
});
