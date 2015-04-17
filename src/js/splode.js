var RARay = RARay || {};

// TODO - rework this to be generic with passable options
RARay.splode = {
    
  init: function() {

    var $container  = $('.card'),
        $wrapper    = $('.splode'),
        $boxes      = $wrapper.find('.box'),
        bgImage;

    // pre-load background images
    $boxes.children('a').each(function() {
      
      bgImage = $(this).css('background-image');
      bgImage = bgImage.substring(4, bgImage.length -1);

      $.get(bgImage);
    });

    $container.on('click.show', 'button', function(e) {

      var left  = e.pageX - $container.offset().left + 'px',
          top   = e.pageY - $container.offset().top + 'px';

      $container.off('click.show');

      $wrapper.show();

      $boxes
        .each(function(i, box) {
          
          TweenMax.from(box, 0.15, {alpha: 0, delay: i * 0.05});
          TweenMax.from(box, 0.75, {
            left: left, 
            top: top, 
            width:0, 
            height:0, 
            delay: i * 0.05,
            ease: Back.easeOut, 
            onComplete: function() {
                
              $(box).removeAttr('style');
            }
          });
        });
    });
  }
};

RARay.card = {

  init: function() {

    var $card = $('.card');

    $card.on('click', function(e) {
      
      if ( ! $(e.target).is('a, button')) {
        $card.toggleClass('flip');
      }
    });
  }
};

$(document).ready(function() {
  
    RARay.splode.init();
    RARay.card.init();
});