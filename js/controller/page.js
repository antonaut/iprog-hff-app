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
                    $('.dish-selection').fadeIn();
                    $('#dish-form').fadeIn();
                }

                ,
                'hide': function () {
                    $('.dish-selection').fadeOut();
                    $('#dish-form').hide();
                }
            }
            ,
            'single-dish': {
                'show': function () {
                    $('.dish-selection').fadeIn();
                    $('#single-dish').fadeIn();
                }

                ,
                'hide': function () {
                    $('.dish-selection').fadeOut();
                    $('#single-dish').hide();
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
                    $('#mydinner').fadeOut();
                    $('.summary').fadeOut();
                }
            }
            ,
            'instructions': {
                'show': function () {
                    $('.summary').fadeIn();
                    $('#instructions').fadeIn();
                }

                ,
                'hide': function () {
                    $('#instructions').fadeOut();
                    $('.summary').fadeOut();
                }
            }
        };

        $('#intro button').click((function() {
            History.pushState(null, null, '?select-dish');
        }).bind(this));

        $('#confirm-dinner').click((function(){
            History.pushState(null, null, '?mydinner');
        }).bind(this));

        History.Adapter.bind(window, 'statechange', (function(evt){
            if (location.search.length <= 1){
                this.pages['front-page'].show();
            } else {
                this.show(location.search.substr(1));
            }
        }).bind(this));
    };

    PageController.prototype.show = function(page_id) {
        if (page_id === this.current) { // no use?
            return;
        }
        if (this.current) {
            this._hide(this.current);
        } else {
            this._hide('front-page');
        }
        this.pages[page_id].show();
        this.current = page_id;
    };

    PageController.prototype._hide = function(page_id) {
        this.pages[page_id].hide();
    };

    PageController.prototype.goToSingleDish = function () {
        History.pushState(null, null, '?single-dish');
    };

    PageController.prototype.goToSelectDish = function () {
        History.pushState(null, null, '?select-dish');    
    };


    PageController.prototype.next = function () {
        if (!this.active) {
            this.active = 0;
        }
        var key = this.pages.keys()[this.active];
        this.pages[key]['hide']();
        if (this.active == this.pages.length - 1) {
            this.active = 0;
        } else {
            this.active = this.active + 1;
        }
        this.pages[key]['show']();
    };


    return PageController;
});
