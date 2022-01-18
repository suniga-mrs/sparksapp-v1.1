var splide = new Splide( '.splide',{
    autoplay    : true,
    rewind      : true,
    pauseOnHover: true,
    pauseOnFocus: true,
    type     : 'loop',
    height   : '350px',
    focus    : 'center',
  });

var bar    = splide.root.querySelector( '.my-slider-progress-bar' );

// Update the bar width:
splide.on( 'mounted move', function () {
  var end = splide.Components.Controller.getEnd() + 1;
  bar.style.width = String( 100 * ( splide.index + 1 ) / end ) + '%';
} );

splide.mount();