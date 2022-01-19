var splide = new Splide( '.splide',{
    autoplay    : true,
    rewind      : true,
    // pauseOnHover: true,
    pauseOnFocus: true,
    type     : 'loop',
    height   : '450px',
    focus    : 'center',
    breakpoints: {
      360: {
        height: '330px',
      },
      390: {
        height: '360px',
      },
      420: {
        height: '380px',
      },
      600: {
        height: '350px',
      },
      820: {
        height: '200px',
      },
      920: {
        height: '240px',
      },
      1100: {
        height: '280px',
      },
      1200: {
        height: '320px',
      },
      1380: {
        height: '350px',
      },    
      1440: {
        height: '360px',
      }
  },
  });

var bar    = splide.root.querySelector( '.my-slider-progress-bar' );

// Update the bar width:
splide.on( 'mounted move', function () {
  var end = splide.Components.Controller.getEnd() + 1;
  bar.style.width = String( 100 * ( splide.index + 1 ) / end ) + '%';
} );

splide.mount();