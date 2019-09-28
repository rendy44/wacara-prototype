(function ($) {
    "use strict"; // Start of use strict
    new class {
        constructor() {
            this.scrollbar();
            this.navbar_toggle();
            this.map_height();
            this.instance_plugins();
            this.smooth_scroll_to();
            this.count_down();
            this.gallery();
        }

        gallery() {
            baguetteBox.run('.galleries');
        }

        count_down() {
            const countdown = $('#countdown');
            if (countdown.length) {
                const data_date = countdown.data('date');
                const countDownDate = new Date(data_date).getTime();
                // Update the count down every 1 second
                let x = setInterval(function () {
                    // Get today's date and time
                    const now = new Date().getTime();
                    // Find the distance between now and the count down date
                    const distance = countDownDate - now;
                    // Time calculations for days, hours, minutes and seconds
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    // Display the result in the element with id="demo"
                    $('#cd_d').html(days);
                    $('#cd_h').html(hours);
                    $('#cd_m').html(minutes);
                    $('#cd_s').html(seconds);
                    // If the count down is finished, write some text
                    if (distance < 0) {
                        clearInterval(x);
                        // document.getElementById("demo").innerHTML = "EXPIRED";
                    }
                }, 1000);
            }
        }

        instance_plugins() {
            // Enable aos animations.
            AOS.init({
                disable: 'mobile',
                once: true
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
    };

})(jQuery); // End of use strict
