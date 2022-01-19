var player,
  time_update_interval = 0;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-placeholder', {
    width: 600,
    height: 400,
    playerVars: {
      color: 'red',
      iv_load_policy: 3
    },
  });
}

$(document).ready(function() {


  $("#f1-trigger").click(function() {
    player.loadVideoById({
      videoId: '0GxKeAL4RnU',
    });

    $("#feature-vid").toggleClass("open-vid");
    player.playVideo();
  });

  $("#f2-trigger").click(function() {
    player.loadVideoById({
      videoId: 'nozlcnBJ-e8',
    });

    $("#feature-vid").toggleClass("open-vid");
    player.playVideo();
  });

  $("#f3-trigger").click(function() {
    player.loadVideoById({
      videoId: 'm5WvcXp2dqU',
    });

    $("#feature-vid").toggleClass("open-vid");
    player.playVideo();
  });

  $("#f4-trigger").click(function() {
    player.loadVideoById({
      videoId: '-Zt2yDVlB30',
    });

    $("#feature-vid").toggleClass("open-vid");
    player.playVideo();
  });

  $("#vid-close").click(function() {
    $("#feature-vid").removeClass("open-vid");
    player.stopVideo();
  });

  $("#feature-vid").mouseup(function(e) {
    var subject = $("#video-placeholder");

    if (e.target.id != subject.attr('id') && !subject.has(e.target).length) {
      $("#vid-close").click();
    }

  });

});