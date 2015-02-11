requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app'
    }
});

requirejs([
    'model/dinner',
    'model/lang_sv',
    'view/example',
    'view/header',
    'view/intro',
    'view/left-summary',
    'view/select-dish',
    'view/summary-overview'

], function (
    DinnerModel,
    language,
    ExampleView,
    HeaderView,
    IntroView,
    LeftSummaryView,
    SelectDishView,
    SummaryOverviewView
) {

    //We instantiate our model
    var model = new DinnerModel("My awesome birthday!", 25);

    model.addDishToMenu(1); // Toast as starter
    model.addDishToMenu(100); // Meatballs as main dish
    model.addDishToMenu(201); // Ice cream as dessert

    //And create the needed controllers and views
    var exampleView = new ExampleView($("#exampleView"));
    var headerView = new HeaderView($("#header"), language);
    var introView = new IntroView($("#intro"), language);
    var leftSummary = new LeftSummaryView($("#left-summary"), language);
    var selectDish = new SelectDishView($("#select-dish"), language);
    var summaryOverview = new SummaryOverviewView($(".summary"), language, model);
});
