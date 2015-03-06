/**
 * Created by Fredrik.
 */

dinnerPlannerApp.factory("lang_en", [function () {

    language = {};

    language.header = {};
    language.header.HEADER = "HOMELETTE";
    language.header.TAGLINE = "From the best chefs in the world directly into your kitchen";

    language.general = {};
    language.general.currency = function(crowns) { return "SEK " + crowns; };
    language.general.LOADING = "Loading";

    language.intro = {};
    language.intro.HEADER = "A home dinner service";
    language.intro.DESC = "On it differed repeated wandered required in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened settling. Likely active her warmly has.  ";

    language.dishinfo = {};
    language.dishinfo.STARTER = "Starter";
    language.dishinfo.MAIN_COURSE = "Main";
    language.dishinfo.DESSERT = "Dessert";

    language.label = {};
    language.label.START_QUICKLY = "start quickly";
    language.label.NEW_DINNER = "Create new dinner";
    language.label.SEARCH = "Search";
    language.label.SEARCH_DEFAULT_TEXT = "Enter key words";
    language.label.CONFIRM_DINNER = "Confirm dinner";
    language.label.CONFIRM_DISH = "Confirm dish";
    language.label.BACK_TO_SELECT = "Back to select dish";
    language.label.BACK_TO_EDIT = "Go back to edit dinner";
    language.label.PRINT_RECIPE = "Print recipe";
    language.label.PRINT_FULL_RECIPE = "Print full recipe";

    language.mydinner = {};
    language.mydinner.HEADER = "My Dinner";
    language.mydinner.PEOPLE = "People";
    language.mydinner.DISH_NAME = "Dish name";
    language.mydinner.COST = "Cost";
    language.mydinner.PENDING = "Pending";


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
}]);