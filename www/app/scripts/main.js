$(document).ready(function () {
  // WOW init
  new WOW().init();

  // Modal Video Init
  new ModalVideo('.js-modal-video');

  // HACK tab-pane conflict with carousel when fade is enabled - fix
  if (window.innerWidth > 800 && window.innerHeight > 600) {
    $('.tab-pane').addClass('fade');
  }

  // Mobile Menu Overlay
  $('.hamburger').on('click', function () {
    $('.overlay-mobile-menu').removeClass('closed');
  });

  $('.overlay-close').on('click', function () {
    $('.overlay-mobile-menu').addClass('closed');
  });

  //nav scroll switch color class
  $('#nav-scroll').switchstyler({
    on: '#dcim, #smart, #cctv, #demo, #footer, #video-management, #testimonials',
    addClass: 'dots-white',
    //removeClass: 'dots-hero'
  });

  $('#nav-scroll').switchstyler({
    on: '#home',
    addClass: 'dots-hero',
  });

  // Request demo from home, pass
  $('#btn-request-demo-home').on('click', function () {
    location.href = 'demo.html?' + $('#form-home-demo-request').serialize();
  });

  // Mailchimp form submission
  $('#mc-embedded-subscribe').on('click', function () {
    //e.prenventDefault();
    setTimeout(checkMailChimpSuccess, 2000);
  });

  function checkMailChimpSuccess() {
    var success = $('#mce-success-response').css('display');
    if (success != 'none') {
      $('#contact-form').hide();
      $('#thank-you').removeAttr('hidden');
    }
  }
});
