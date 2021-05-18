$(document).ready(function () {
    // OWL SLIDER =================================================================================
    // REVIEW HOME SLIDER
    var firstblockReview = $('.firstblock-review__slider .owl-carousel');

    if (firstblockReview.length) {
        firstblockReview.owlCarousel({
            lazyLoad: false,
            dots: true,
            nav: true,
            navContainer: '.firstblock-review__action-nav',
            dotsContainer: '.firstblock-review__action-dots',
            navText: [arrowLeftSVG, arrowRightSVG],
            items: 1,
            margin: 0,
            stagePadding: 0,
            center: false,
            startPosition: 0,
            loop: true,
            smartSpeed: 300,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            slideTransition: 'ease',
            responsive: {
                0: {
                    //items:1
                },
                600: {
                    //items:3
                },
                1000: {
                    //items:5
                }
            }
        });
    }


    // OWL SLIDER =================================================================================
    // price 
    var firstblockReview = $('.services-team-owl .owl-carousel');

    if (firstblockReview.length) {
        firstblockReview.owlCarousel({
            lazyLoad: false,
            dots: true,
            nav: true,
            navContainer: '.services-team-owl-nav',
            dotsContainer: '.services-team-owl-dots',
            navText: [arrowLeftSVG, arrowRightSVG],
            items: 1,
            margin: 0,
            stagePadding: 0,
            center: false,
            startPosition: 0,
            loop: true,
            smartSpeed: 300,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            slideTransition: 'ease',
            responsive: {
                0: {
                    //items:1
                },
                600: {
                    //items:3
                },
                1000: {
                    //items:5
                }
            }
        });
    }

    //faq
    $('.faq-item__question').on('click', function () {
        $(this).parent().toggleClass('open')
    });


});