(function ($) {
    "use strict"; // Start of use strict
    class appClass {
        constructor() {
            this.scrollbar();
            this.navbar_toggle();
            this.map_height();
            this.instance_plugins();
        }

        instance_plugins() {
            AOS.init();
        }

        scrollbar() {
            $(window).scroll(function () {
                const nav = $('nav.navbar'),
                    top = 50;
                if ($(window).scrollTop() >= top) {
                    nav.addClass('scrolled');
                } else {
                    nav.removeClass('scrolled');
                }
            });
        }

        navbar_toggle() {
            $('button.navbar-toggler').click(function (e) {
                e.preventDefault();
                const nav = $(this).closest('nav');
                nav.toggleClass('opened');
            })
        }

        map_height() {
            const map_column = $('.col-map'),
                embed_wrapper = map_column.find('.embed-responsive');
            const window_width = $(window).width();
            let embed_class = '21by9';
            if (map_column.length) {
                if (window_width >= 992) {
                    embed_class = '4by3';
                }
                embed_wrapper.addClass('embed-responsive-' + embed_class);
            }
        }
    }

    // Instance the class
    new appClass();

})(jQuery); // End of use strict