/**
 * Created by Fredrik on 2015-02-12.
 */
define([], function () {
    var PageController = function (model) {
        this.model = model;

        this.pages = {
            'front-page': {
                'show': function () {
                    $(".front-page").fadeIn();
                }

                ,
                'hide': function () {
                    $(".front-page").fadeOut();
                }
            }
            ,
            'select-dish': {
                'show': function () {
                    $("#dish-form").fadeIn();
                    $(".dish-selection").fadeIn();
                }

                ,
                'hide': function () {
                    $("#dish-form").fadeOut();
                }
            }
            ,
            'single-dish': {
                'show': function () {
                    $('#single-dish').fadeIn();
                }

                ,
                'hide': function () {
                    $('#single-dish').fadeOut();
                    $('.dish-selection').fadeOut();
                }
            }
            ,
            'mydinner': {
                'show': function () {
                    $('#mydinner').fadeIn();
                }

                ,
                'hide': function () {
                    $('.summary').fadeOut();
                }
            }
            ,
            'instructions': {
                'show': function () {
                    $('#instructions').fadeIn();
                }

                ,
                'hide': function () {
                    $('#mydinner').fadeOut();
                    $('.summary').show();
                    $('#instructions').hide();
                }
            }
        };
        this.last = 'front-page';

        $('#intro button, #dish-details button, #ingredient-list button').click((function () {
            this.show("select-dish");
        }).bind(this));
    };

    PageController.prototype.show = function(page_id) {
        this.hideLast();
        this.pages[page_id].show();
        this.last = page_id;
    };

    PageController.prototype.hideLast = function() {
        this.pages[this.last].hide();
    };

    PageController.prototype.goToSingleDish = function () {
        this.show('single-dish');
    };


    PageController.prototype.next = function () {

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
