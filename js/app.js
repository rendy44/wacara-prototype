(function ($) {
    "use strict"; // Start of use strict
    class appClass {
        constructor() {
            this.scrollbar();
            this.navbar_toggle();
            this.map_height();
            this.instance_plugins();
            this.smooth_scroll_to();
        }

        instance_plugins() {
            // Enable aos animations.
            AOS.init({
                disable: 'mobile'
            });
            // Enable scrollspy.
            $('body').scrollspy({
                target: ".navbar",
                offset: 180
            })
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

        smooth_scroll_to() {
            $(".scroll").on('click', function (event) {
                if (this.hash !== "" && !$(this).hasClass('active')) {
                    event.preventDefault();
                    const hash = this.hash;
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top - 180
                    }, 800, function () {
                        window.location.hash = hash;
                    });
                }
            });
        }
    }

    // Instance the class
    new appClass();

})(jQuery); // End of use strict