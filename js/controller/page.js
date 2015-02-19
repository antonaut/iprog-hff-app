define(['History'], function (History) {
    var PageController = function (model) {
        this.model = model;
        this.pages = {
            'front-page': {
                'show': function () {
                    $('.front-page').show();
                }

                ,
                'hide': function () {
                    $('.front-page').hide();
                }
            }
            ,
            'select-dish': {
                'show': function () {
                    $('.dish-selection').show();
                    $('#dish-form').show();
                }

                ,
                'hide': function () {
                    $('.dish-selection').hide();
                    $('#dish-form').hide();
                }
            }
            ,
            'single-dish': {
                'show': function () {
                    $('.dish-selection').show();
                    $('#single-dish').show();
                }

                ,
                'hide': function () {
                    $('.dish-selection').hide();
                    $('#single-dish').hide();
                }
            }
            ,
            'mydinner': {
                'show': function () {
                    $('.summary').show();
                    $('#mydinner').show();
                }

                ,
                'hide': function () {
                    $('#mydinner').hide();
                    $('.summary').hide();
                }
            }
            ,
            'instructions': {
                'show': function () {
                    $('.summary').show();
                    $('#instructions').show();
                }

                ,
                'hide': function () {
                    $('#instructions').hide();
                    $('.summary').hide();
                }
            }
        };

        $('#intro button').click((function() {
            console.log('click');
            History.pushState(null, null, '?select-dish');
            if (location.search.length > 1) {
                this.show('select-dish');
            }
        }).bind(this));

        $('#confirm-dinner').click((function(){
            History.pushState(null, null, '?mydinner');
        }).bind(this));

        History.Adapter.bind(window, 'statechange', (function(evt){
            console.log('statechange');
            if (location.search.length <= 1) {
                this.pages['front-page'].show();
            } else {
                this.show(location.search.substr(1));
            }
        }).bind(this));
    };

    PageController.prototype.show = function(page_id) {
        console.log('show')
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

    PageController.prototype.back = function () {
        History.back();
    };


    return PageController;
});
