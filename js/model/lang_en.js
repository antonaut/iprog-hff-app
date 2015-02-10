/**
 * Created by Fredrik on 2015-02-10.
 */

define([], function () {

    appdata = {};

    appdata.header = {};
    appdata.header.HEADER = "HOMELETTE";
    appdata.header.TAGLINE = "From the best chefs in the world directly into your kitchen";

    appdata.intro = {};
    appdata.intro.HEADER = "A home dinner service";
    appdata.intro.DESC = "Muutakin suuresta maailman ja no jokainen. Jolla ei mutta tahan ai he. En ne katsoi paahan kerran ai tyhjan hauska he. Huulilla jos oma kaikkien israelin nyt han saavansa. Rakentaa pelastaa metsassa vaativat ole luo jokainen. Kullakin ruuhessa te nostivat tarkkaan ja varmasti se jo vaikenee. Huumannut kuitenkin millainen et ai jo sylyyksen kastettua ikkunasta. ";

    appdata.dishinfo = {};
    appdata.dishinfo.STARTER = "Starter";
    appdata.dishinfo.MAIN_COURSE = "Main";
    appdata.dishinfo.DESERT = "Dessert";

    appdata.label = {};
    appdata.label.START_QUICKLY = "start quickly";
    appdata.label.NEW_DINNER = "Create new dinner";
    appdata.label.SEARCH = "Search";
    appdata.label.SEARCH_DEFAULT_TEXT = "Enter key words";
    appdata.label.CONFIRM_DINNER = "Confirm dinner";
    appdata.label.CONFIRM_DISH = "Confirm dish";
    appdata.label.BACK_TO_SELECT = "Back to select dish";
    appdata.label.BACK_TO_EDIT = "Back to edit dinner";
    appdata.label.PRINT_RECIPE = "Print recipe";

    appdata.dishlist = {};
    appdata.dishlist.HEADER = "My Dinner";
    appdata.dishlist.PEOPLE = "People";
    appdata.dishlist.DISH_NAME = "Dish name";
    appdata.dishlist.COST = "Cost";
    appdata.dishlist.PENDING = "Pending";

    appdata.selectdish = {};
    appdata.selectdish.HEADER = "SELECT DISH";

    appdata.dishdetails = {};
    appdata.dishdetails.ingredients_header = function (numberOfPeople) {return "INGREDIENTS FOR " + numberOfPeople + " PEOPLE";};
    appdata.dishdetails.PREPARATION_HEADER = "Preparation";

    appdata.dinner_overview= {};
    appdata.dinner_overview.header =  function (numberOfPeople) {return "My dinner: "+numberOfPeople+ " PEOPLE";};





    return appdata;
});