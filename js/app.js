(function ($) {
    "use strict"; // Start of use strict
    class appClass {
        constructor() {
            this.scrollbar();
            this.navbar_toggle();
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
    }

    // Instance the class
    new appClass();

})(jQuery); // End of use strict