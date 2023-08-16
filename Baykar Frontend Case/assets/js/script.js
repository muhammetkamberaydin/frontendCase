
$(document).ready(function () {

    $(".hide").hide();
    $(".usaText").show();

    $(".marker-usa").click(function () {
        $(".hide").hide();
        $(".usaText").show();
    });

    $(".marker-kanada").click(function () {
        $(".hide").hide();
        $(".kanadaText").show();
    });

    $(".marker-kanadaSecond").click(function () {
        $(".hide").hide();
        $(".kanadaSecondText").show();
    });

    $(".marker-uk").click(function () {
        $(".hide").hide();
        $(".ukText").show();
    });

    //SWIPPER GALLERY PROPERTIES START
    var swiper = new Swiper('.swiper-container.swiper-testimonial', {
        slidesPerView: 3,
        spaceBetween: 40,

        navigation: {
            nextEl: '.swiper-button-next-test',
            prevEl: '.swiper-button-prev-test',
        },

        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            450: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            600: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 50
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 50
            }
        }

    });
    //SWIPPER GALLERY PROPERTIES START
    AOS.init();
});