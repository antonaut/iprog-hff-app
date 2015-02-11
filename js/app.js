requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app'
    }
});

requirejs([
    'model/dinner',
    'model/lang_en',
    'view/example',
    'view/header',
    'view/intro',
    'view/left-summary',
    'view/select-dish'

], function (
    DinnerModel,
    language,
    ExampleView,
    HeaderView,
    IntroView,
    LeftSummaryView,
    SelectDishView
) {

    //We instantiate our model
    var model = new DinnerModel("My awesome birthday!", 25);
    console.log(model.name);
    window.m = model;

    //And create the needed controllers and views
    var exampleView = new ExampleView($("#exampleView"));
    var headerView = new HeaderView($("#header"), language);
    var introView = new IntroView($("#intro"), language);
    var leftSummary = new LeftSummaryView($("#left-summary"), language);
    var selectDish = new SelectDishView($("#select-dish"), language);
});
