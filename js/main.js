$(document).ready(function() {
    "use strict";

    /* 

    1. Vars and Inits

    */

    var header = $('.header');
    var menu = $('.menu');
    var burger = $('.hamburger');
    var menuActive = false;
    var ctrl = new ScrollMagic.Controller();

    setHeader();

    $(window).on('resize', function() {
        setHeader();

        if (window.innerWidth > 1280) {
            if (menuActive) {
                closeMenu();
            }
        }
        setTimeout(function() {
            jQuery(".main_content_scroll").mCustomScrollbar("update");
        }, 375);
    });

    $(document).on('scroll', function() {
        setHeader();
    });

    initMenu();
    initLoaders();

    /* 

    2. Set Header

    */

    function setHeader() {
        if ($(window).scrollTop() > 91) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    }

    /* 

    3. Init Menu

    */

    function initMenu() {
        if ($('.hamburger').length && $('.menu').length) {
            var hamb = $('.hamburger');

            hamb.on('click', function() {
                if (!menuActive) {
                    openMenu();
                } else {
                    closeMenu();
                }
            });
        }
    }

    function openMenu() {
        menu.addClass('active');
        menuActive = true;
    }

    function closeMenu() {
        menu.removeClass('active');
        menuActive = false;
    }

    /* 

    4. Init Loaders

    */

    function initLoaders() {
        if ($('.loader').length) {
            var loaders = $('.loader');

            loaders.each(function() {
                var loader = this;
                var endValue = $(loader).data('perc');

                var loaderScene = new ScrollMagic.Scene({
                        triggerElement: this,
                        triggerHook: 'onEnter',
                        reverse: false
                    })
                    .on('start', function() {
                        var bar = new ProgressBar.Circle(loader, {
                            color: '#8583e1',
                            // This has to be the same size as the maximum width to
                            // prevent clipping
                            strokeWidth: 1,
                            trailWidth: 20,
                            trailColor: '#e5e6e8',
                            easing: 'easeInOut',
                            duration: 1400,
                            text: {
                                autoStyleContainer: false
                            },
                            from: { color: '#8583e1', width: 1 },
                            to: { color: '#8583e1', width: 1 },
                            // Set default step function for all animate calls
                            step: function(state, circle) {
                                circle.path.setAttribute('stroke', state.color);
                                circle.path.setAttribute('stroke-width', state.width);

                                var value = Math.round(circle.value() * 100);
                                if (value === 0) {
                                    circle.setText('0%');
                                } else {
                                    circle.setText(value + "%");
                                }
                            }
                        });
                        bar.text.style.fontFamily = '"Montserrat", sans-serif';
                        bar.text.style.fontSize = '44px';
                        bar.text.style.fontWeight = '700';
                        bar.text.style.color = "#100f3a";


                        bar.animate(endValue); // Number from 0.0 to 1.0
                    })
                    .addTo(ctrl);
            });
        }
    }

});


AOS.init({
    duration: 800,
    easing: 'slide',
    once: false
});

jQuery(document).ready(function($) {

    "use strict";


    var siteMenuClone = function() {

        $('.js-clone-nav').each(function() {
            var $this = $(this);
            $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
        });


        setTimeout(function() {

            var counter = 0;
            $('.site-mobile-menu .has-children').each(function() {
                var $this = $(this);

                $this.prepend('<span class="arrow-collapse collapsed">');

                $this.find('.arrow-collapse').attr({
                    'data-toggle': 'collapse',
                    'data-target': '#collapseItem' + counter,
                });

                $this.find('> ul').attr({
                    'class': 'collapse',
                    'id': 'collapseItem' + counter,
                });

                counter++;

            });

        }, 1000);

        $('body').on('click', '.arrow-collapse', function(e) {
            var $this = $(this);
            if ($this.closest('li').find('.collapse').hasClass('show')) {
                $this.removeClass('active');
            } else {
                $this.addClass('active');
            }
            e.preventDefault();

        });

        $(window).resize(function() {
            var $this = $(this),
                w = $this.width();

            if (w > 768) {
                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        })

        $('body').on('click', '.js-menu-toggle', function(e) {
            var $this = $(this);
            e.preventDefault();

            if ($('body').hasClass('offcanvas-menu')) {
                $('body').removeClass('offcanvas-menu');
                $this.removeClass('active');
            } else {
                $('body').addClass('offcanvas-menu');
                $this.addClass('active');
            }
        })

        // click outisde offcanvas
        $(document).mouseup(function(e) {
            var container = $(".site-mobile-menu");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        });
    };
    siteMenuClone();


    var sitePlusMinus = function() {
        $('.js-btn-minus').on('click', function(e) {
            e.preventDefault();
            if ($(this).closest('.input-group').find('.form-control').val() != 0) {
                $(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
            } else {
                $(this).closest('.input-group').find('.form-control').val(parseInt(0));
            }
        });
        $('.js-btn-plus').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
        });
    };
    // sitePlusMinus();


    var siteSliderRange = function() {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function(event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));
    };
    // siteSliderRange();



    var siteCarousel = function() {
        if ($('.nonloop-block-13').length > 0) {
            $('.nonloop-block-13').owlCarousel({
                center: false,
                items: 1,
                loop: true,
                stagePadding: 0,
                margin: 0,
                autoplay: true,
                nav: true,
                navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
                responsive: {
                    600: {
                        margin: 0,
                        nav: true,
                        items: 2
                    },
                    1000: {
                        margin: 0,
                        stagePadding: 0,
                        nav: true,
                        items: 3
                    },
                    1200: {
                        margin: 0,
                        stagePadding: 0,
                        nav: true,
                        items: 4
                    }
                }
            });
        }

        $('.slide-one-item').owlCarousel({
            center: false,
            items: 1,
            loop: true,
            stagePadding: 0,
            margin: 0,
            smartSpeed: 1000,
            autoplay: true,
            pauseOnHover: false,
            autoHeight: true,
            nav: false,
            navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
        });


    };
    siteCarousel();

    var siteStellar = function() {
        $(window).stellar({
            responsive: false,
            parallaxBackgrounds: true,
            parallaxElements: true,
            horizontalScrolling: false,
            hideDistantElements: false,
            scrollProperty: 'scroll'
        });
    };
    // siteStellar();


    var siteDatePicker = function() {

        if ($('.datepicker').length > 0) {
            $('.datepicker').datepicker();
        }

    };
    siteDatePicker();

    var siteSticky = function() {
        $(".js-sticky-header").sticky({ topSpacing: 0 });
    };
    siteSticky();

    // navigation
    var OnePageNavigation = function() {
        var navToggler = $('.site-menu-toggle');
        $("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a", function(e) {
            e.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                'scrollTop': $(hash).offset().top
            }, 600, 'easeInOutExpo', function() {
                window.location.hash = hash;
            });

        });
    };
    OnePageNavigation();

    var siteScroll = function() {



        $(window).scroll(function() {

            var st = $(this).scrollTop();

            if (st > 100) {
                $('.js-sticky-header').addClass('shrink');
            } else {
                $('.js-sticky-header').removeClass('shrink');
            }

        })

    };
    siteScroll();



    $('.fancybox').on('click', function() {
        var visibleLinks = $('.fancybox');

        $.fancybox.open(visibleLinks, {}, visibleLinks.index(this));

        return false;
    });

});