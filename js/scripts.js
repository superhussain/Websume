(function ($) {
  jQuery(document).ready(function ($) {
    sectionScroll();
  });
  $(window).resize(function() {
    sectionScroll();
  });
})(jQuery);

var sectionScroll = function() {
  section = $('section');
  var windowHeight = $(window).height();
  if (windowHeight > 860) {
    section.css({'height': windowHeight + 'px'});
  }
};
