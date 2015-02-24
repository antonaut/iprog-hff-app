requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app',
        'History': 'lib/jquery.history'
    },
    shim: {
        'History': {
            'exports': 'History'
        }
    }
});

requirejs([
    'model/dinner-bigoven',
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
    'controller/selectDish',
    'controller/single-dish',
    'controller/left-summary',
    'controller/mydinner'

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
    SelectDishController,
    SingleDishController,
    LeftSummaryController,
    MyDinnerController
) {

    //We instantiate our model
    var model = new DinnerModel("My awesome birthday!", 25);
    model.searchForDishes("starter");

    model.selectedDish=1;

    var pageController = new PageController(model);
    var selectDishController = new SelectDishController(model);
    var singleDishController = new SingleDishController(model, pageController);
    var leftSummaryController = new LeftSummaryController(model);
    var myDinnerController = new MyDinnerController(model, pageController);


    //And create the needed controllers and views
    var exampleView = new ExampleView($("#exampleView"));
    var headerView = new HeaderView($("#header"), language, model);
    var introView = new IntroView($("#intro"), language);
    var leftSummary = new LeftSummaryView($("#left-summary"), language, model,leftSummaryController);
    var selectDish = new SelectDishView($("#dish-form"), language, model, selectDishController, pageController);
    var myDinnerView = new MyDinnerView($("#mydinner"), language);
    var summaryOverview = new SummaryOverviewView($(".summary"), language, model);
    var instructionsView = new InstructionsView($("#instructions"),language, model);
    var singleDishView = new SingleDishView($('#single-dish'),language,model);


    // Add cross-references
    selectDishController.attachView(selectDish);
    singleDishController.attachView(leftSummary);

    model.addObserver(function(){instructionsView.update();});
    model.addObserver(function(){leftSummary.update();});
    model.addObserver(function(){selectDish.update();});
    model.addObserver(function(){singleDishView.update();});
    model.addObserver(function(){summaryOverview.update();});

    model.guests=4;

    model.notifyObservers();
});
