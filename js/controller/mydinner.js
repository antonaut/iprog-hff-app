define([], function() {
    var MyDinnerController = function(model, pageController) {
        this.model = model;
        this.pageController = pageController;

        $('#mydinner .info-bar button').click((function(){
            this.pageController.back();
        }).bind(this));

        $('#mydinner .summary button').click((function(){
            this.pageController.goToInstructions();
        }).bind(this));
    };

    return MyDinnerController;
});