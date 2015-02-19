/**
 * Created by Fredrik on 2015-02-19.
 */
define([], function(){

    var LeftSummaryController = function(model) {
        this.model = model;
    };


    LeftSummaryController.prototype.attachView=function(view){
        this.view=view;
    };
});