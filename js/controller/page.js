/**
 * Created by Fredrik on 2015-02-12.
 */
define([], function(){
    var PageController = function() {
        this.pages = [
            {
                'show': function() {
                    $(".front-page").fadeIn();
                },
                'hide': function() {
                    $(".front-page").fadeOut();
                }
            },{
                'show': function() {
                    $("#dish-form").fadeIn();
                    $(".dish-selection").fadeIn();
                },
                'hide': function() {
                    $("#dish-form").fadeOut();
                }
            },{
                'show': function() {
                    $('#single-dish').fadeIn();
                },
                'hide': function () {
                    $('#single-dish').fadeOut();
                    $('.dish-selection').fadeOut();
                }
            },{
                'show': function() {
                    $('#mydinner').fadeIn();
                },
                'hide': function() {
                    $('.summary').fadeOut();
                }
            },
            {
                'show': function() {
                    $('#instructions').fadeIn();
                },
                'hide': function() {
                    $('#mydinner').fadeOut();
                    $('.summary').show();
                    $('#instructions').hide();
                }
            }
        ]
        this.active = 0;
    };

    PageController.prototype.next = function() {

        this.pages[this.active]['hide']();
        if (this.active == this.pages.length - 1) {
            this.active = 0;
        } else {
            this.active = this.active + 1;
        }
        this.pages[this.active]['show']();
    };

    return PageController;
});
