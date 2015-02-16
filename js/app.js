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
    'view/select-dish',
    'view/summary-overview',
    'view/my-dinner',
    'view/instructions',
    'view/single-dish',
    'controller/page',
    'controller/selectDish'

], function (
    DinnerModel,
    language,
    ExampleView,
    HeaderView,
    IntroView,
    LeftSummaryView,
    SelectDishView,
    SummaryOverviewView,
    MyDinnerView,
    InstructionsView,
    SingleDishView,
    PageController,
    SelectDishController
) {

    //We instantiate our model
    var model = new DinnerModel("My awesome birthday!", 25);

    model.selectedDish=1;
    model.addDishToMenu(1); // Toast as starter
    model.addDishToMenu(100); // Meatballs as main dish
    model.addDishToMenu(201); // Ice cream as dessert

    Object.observe(model, function(changes) {
        changes.forEach(function(change) {
            // Any time name or title change, update the greeting
            console.log(change);
        });
    });

    var pageController = new PageController(model);
    var selectDishController = new SelectDishController(model);


    //And create the needed controllers and views
    var exampleView = new ExampleView($("#exampleView"));
    var headerView = new HeaderView($("#header"), language, model);
    var introView = new IntroView($("#intro"), language);
    var leftSummary = new LeftSummaryView($("#left-summary"), language, model);
    var selectDish = new SelectDishView($("#dish-form"), language, model, selectDishController, pageController);
    var myDinnerView = new MyDinnerView($("#mydinner"), language);
    var summaryOverview = new SummaryOverviewView($(".summary"), language, model);
    var instructionsView = new InstructionsView($("#instructions"),language, model);
    var singleDishView = new SingleDishView($('#single-dish'),language,model);


    // Add cross-references
    selectDishController.attachView(selectDish);

    model.addObserver(function(){instructionsView.update();});
    model.addObserver(function(){leftSummary.update();});
    model.addObserver(function(){selectDish.update();});
    model.addObserver(function(){singleDishView.update();});
    model.addObserver(function(){summaryOverview.update();});

    model.addDishToMenu(101);
    model.guests=22;

    model.notifyObservers();



    window.onkeypress = (function(evt){
        if (evt.keyCode == 32) {
            pageController.next();
        }
        evt.preventDefault();
    });
});
