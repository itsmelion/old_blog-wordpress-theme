$('.slick-container').slick({
    infinite: true,
    slidesToScroll: 3,
    slidesToShow: 3,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    variableWidth: true,
    adaptiveHeight: false,
    centerMode: true,
    dots: false,
    responsive: [{
        breakpoint: 980,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false
        }
    }]
});
$('#postsSlick').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    variableWidth: false,
    adaptiveHeight: false,
    centerMode: false,
    dots: false,
    responsive: [{
        breakpoint: 980,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false
        }
    }]
});