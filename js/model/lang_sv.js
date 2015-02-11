/**
 * Created by Anton <aerholt@kth.se> on 2015-02-11.
 */

define([], function () {

    language = {};

    language.header = {};
    language.header.HEADER = "HOMELETTE";
    language.header.TAGLINE = "Från de bästa kockarna i världen direkt in i ditt kök.";

    language.intro = {};
    language.intro.HEADER = "En hemmamiddagstjänst";
    language.intro.DESC = "En såt skinun get varn han förta ärsarn, ytt Chandå om intrån mas igt! Vill och fungsh kväxan kon Vide och haderi begn het des somsky demen minna fader renats, äg. Kolige så de Tjufva förd gick de krig höllöm hernar bet icklan en blo han Söktil pan, djoro bätatti. Rennläd sjär sna, sintig ändit, I jag uppen fre och O nusieta tide Att ommar byttor endage, bron till af rektad ommarm. Är em ett.";

    language.dishinfo = {};
    language.dishinfo.STARTER = "Förrätt";
    language.dishinfo.MAIN_COURSE = "Varmrätt";
    language.dishinfo.DESERT = "Efterrätt";

    language.label = {};
    language.label.START_QUICKLY = "kom igång";
    language.label.NEW_DINNER = "Skapa ny middag";
    language.label.SEARCH = "Sök";
    language.label.SEARCH_DEFAULT_TEXT = "Skriv in söktermer";
    language.label.CONFIRM_DINNER = "Godkänn middag";
    language.label.CONFIRM_DISH = "Godkänn rätt";
    language.label.BACK_TO_SELECT = "Tillbaka till välj rätt";
    language.label.BACK_TO_EDIT = "Tillbaka till ändra middag";
    language.label.PRINT_RECIPE = "Skriv ut recept";

    language.dishlist = {};
    language.dishlist.HEADER = "Min middag";
    language.dishlist.PEOPLE = "Gäster";
    language.dishlist.DISH_NAME = "Middagsnamn";
    language.dishlist.COST = "Kostnad";
    language.dishlist.PENDING = "Vald rätt";
    language.dishlist.currency = function(crowns) { return "SEK " + crowns; };

    language.selectdish = {};
    language.selectdish.HEADER = "Välj rätt";
    language.selectdish.PLACEHOLDER = "Mmm... Pannkakor!";

    language.dishdetails = {};
    language.dishdetails.ingredients_header = function (numberOfPeople) {return "INGREDIENSER FÖR " + numberOfPeople + " GÄSTER";};
    language.dishdetails.PREPARATION_HEADER = "Förberedelse";

    language.dinner_overview= {};
    language.dinner_overview.header =  function (numberOfPeople) {return "Min middag: "+numberOfPeople+ " GÄSTER";};


    return language;
});
