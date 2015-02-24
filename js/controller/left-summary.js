/**
 * Created by Fredrik on 2015-02-19.
 */
define([], function(){

    var LeftSummaryController = function(model) {
        this.model = model;

        var guestsField=$("#guests");
        guestsField.keypress(function(event){
            //console.log(event);
            if(!(event.keyCode >= 48 && event.keyCode <= 57)){
                event.preventDefault();
            }
        });

        guestsField.on("input",(function(){
           var guests=$("#guests").val();
            if(guests&&guests>0) {
                this.model.guests = parseInt(guests)
                this.model.notifyObservers();
            }
        }).bind(this));

        guestsField.on("paste",function(event){
            event.preventDefault();
        });
    };
    return LeftSummaryController;
});
