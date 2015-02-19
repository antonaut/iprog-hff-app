define(['History'], function (History) {
    var PageController = function (model) {
        this.model = model;

        this.pages = {
            'front-page': {
                'show': function () {
                    $('.front-page').fadeIn();
                }

                ,
                'hide': function () {
                    $('.front-page').fadeOut();
                }
            }
            ,
            'select-dish': {
                'show': function () {
                    $('#dish-form').fadeIn();
                    $('.dish-selection').fadeIn();
                }

                ,
                'hide': function () {
                    $('#dish-form').fadeOut();
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
                }
            }
            ,
            'mydinner': {
                'show': function () {
                    $('.summary').fadeIn();
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

        $('#intro button').click((function() {
            this.show('select-dish');
        }).bind(this));
        $('#dish-details button').click((function() {
            History.back();
        }).bind(this));
        $('#ingredient-list button').click((function () {
            this.show('select-dish');
        }).bind(this));

        History.Adapter.bind(window, 'statechange', (function(evt){
            console.log('statechange');
            if (location.search.length <= 1){
                this.show('front-page');
            } else {
                this.show(location.search.substr(1));
            }
        }).bind(this));
    };

    PageController.prototype.show = function(page_id) {
        if (this.current) {
            this.hide(this.current);
        } else {
            this.hide('front-page');
        }

        this.pages[page_id].show();
        History.pushState(null, null, '?'+page_id);
        this.current = page_id;
    };

    PageController.prototype.hide = function(page_id) {
        this.pages[page_id].hide();
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
