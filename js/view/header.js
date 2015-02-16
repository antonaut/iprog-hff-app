define([], function() {
        return function (container, language) {
                this.container=container;
                this.language=language;

                container.children("h1").html(language.header.HEADER);
                container.children("p").html(language.header.TAGLINE);
        };
});