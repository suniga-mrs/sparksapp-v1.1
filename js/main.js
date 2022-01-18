$(document).ready(function() {

  

  $("#toggle").click(function() {
    $("#mobileNavWrap").toggleClass("open-nav");
  });

  var scroll = new SmoothScroll('a[href*="#"]');

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });

  $('.scrollup').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

});