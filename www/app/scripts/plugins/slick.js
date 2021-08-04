$(document).ready(function() {
  /* Slick */
  $('.slick-float-right').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    initialSlide: 1,
    centerMode: true,
    centerPadding: '140px',
    arrows: false,
    mobileFirst: false,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '30px',
          initialSlide: 0,
        },
      },
    ],
  });

  /* Slider for - Months carousel */
  $('.slick-months-content').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slick-months',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0px',
          swipe: false,
          swipeToSlide: false,
        },
      },
    ],
  });

  var slidesCount = 0;
  $('.slick-months')
    .on('init reInit', function(event, slick, currentSlide, nextSlide) {
      slidesCount = slick.slideCount - 1;
    })
    .slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.slick-months-content',
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      infinite: false,
      centerMode: true,

      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: '111px',
          },
        },
      ],
    })
    .slick('slickGoTo', slidesCount);

  $('.slick-months-content-inner').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    infinite: false,
    swipe: false,
    swipeToSlide: false,
    dots: true,

    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '70px',
          dots: false,
          swipe: true,
          swipeToSlide: true,
        },
      },
    ],
  });

  /* Slick home from tabs - mobile only */

  // slider
  var slick_slider = $('.slick-home-from-tabs'),
    settings_slider = {
      dots: true,
      arrows: false,
      // more settings
    };
  slick_on_mobile(slick_slider, settings_slider);

  // slick on mobile
  function slick_on_mobile(slider, settings) {
    $(window).on('load resize', function() {
      if ($(window).width() > 767) {
        if (slider.hasClass('slick-initialized')) {
          slider.slick('unslick');
        }
        return;
      }
      if (!slider.hasClass('slick-initialized')) {
        return slider.slick(settings);
      }
    });
  }
});
