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
    'view/intro'

], function (DinnerModel,
             lang_en,
             ExampleView,
             HeaderView,
             IntroView) {

    //We instantiate our model
    var model = new DinnerModel("My awesome birthday!", 25);
    var language = lang_en;
    console.log(model.name);
    window.m = model;

    //And create the needed controllers and views
    var exampleView = new ExampleView($("#exampleView"));
    var headerView = new HeaderView($("#header"), language);
    var introView = new IntroView($("#intro"), language);
});

