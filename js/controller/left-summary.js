/**
 * Created by Fredrik on 2015-02-19.
 */
define([], function(){

    var LeftSummaryController = function(model) {
        this.model = model;
        this.views = [];

        var guestsField=$("#guests");
        guestsField.keypress(function(event){
            console.log(event);
            if(!(event.keyCode >= 48 && event.keyCode <= 57)){
                event.preventDefault();
            }
        });

        guestsField.on("input",(function(){
           var guests=$("#guests").val();
            if(guests&&guests>0) {
                this.model.guests = parseInt(guests)
                this.updateAllViews();
            }
        }).bind(this));

        guestsField.on("paste",function(event){
            event.preventDefault();
        });
    };

    LeftSummaryController.prototype.updateAllViews=function(){
        for(var index in this.views){
            this.views[index].update();
        }



    };



    LeftSummaryController.prototype.attachView=function(view){
        this.views.push(view);
    };
    return LeftSummaryController;
});
