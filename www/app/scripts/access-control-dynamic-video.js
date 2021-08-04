(function ($) {
  $(document).ready(function () {
    var video = $('#dynamic-video');
    var currentVideoId = 0;

    /* Videos */
    var videos = [
      'KeynesiaPanel_Email_1080_WhiteBG.mp4',
      'KeynesiaPanel_NFC_1080_WhiteBG.mp4',
      'KeynesiaPanel_Pin_1080_WhiteBG.mp4',
      'KeynesiaPanel_QR_1080_WhiteBG.mp4',
      'KeynesiaPanel_EtixAuth_1080_WhiteBG.mp4',
    ];

    /* Play video */
    function playVideo(id) {
      $('[data-dynmic-video-id]').removeClass('active');
      $('[data-dynmic-video-id=' + id + ']').addClass('active');

      video.find('source').attr('src', 'videos/access_control/' + videos[id]);
      video[0].load();
      video.trigger('play');
    }

    /* Handle click video change */
    $('[data-dynmic-video-id]').click(function () {
      var videoId = $(this).data('dynmic-video-id');
      currentVideoId = videoId;
      playVideo(videoId);
    });

    /* On video End, start next */
    video[0].onended = function () {
      var nextVidId = ++currentVideoId;
      if (currentVideoId == videos.length) {
        nextVidId = 0;
        currentVideoId = 0;
      }

      playVideo(nextVidId);
    };

    /* Play video on section scroll */

    $(window).scroll(function () {
      function elementScrolled(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        return elemTop + 150 <= docViewBottom && elemTop + 800 >= docViewTop;
      }

      if (elementScrolled('#container-dynamic-video')) {
        video.trigger('play');
        video[0].autoplay = true;
      }
    });
  });
})(jQuery);
