$(document).ready(function () {
  /* Switch Navbar class on scroll  */
  var scrollPos = $(document).scrollTop();
  adaptNavbar(scrollPos);

  $(window).on('scroll', function () {
    var scrollPos = $(document).scrollTop();
    adaptNavbar(scrollPos);
  });

  function adaptNavbar(scrollPos) {
    if (scrollPos >= 100) {
      $('.navbar-primary').addClass('nav-scrolled');
    } else {
      $('.navbar-primary').removeClass('nav-scrolled');
    }
  }

  // Hide Navbar on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 3;
  var navbarHeight = $('.navbar-primary').outerHeight();

  $(window).on('scroll', function () {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(document).scrollTop();

    if (Math.abs(lastScrollTop - st) <= delta) return;

    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('.navbar-primary')
        .removeClass('nav-down')
        .addClass('nav-up');
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('.navbar-primary')
          .removeClass('nav-up')
          .addClass('nav-down');
      }
    }

    lastScrollTop = st;
  }
});
