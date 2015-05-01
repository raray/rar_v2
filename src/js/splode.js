var RARay = RARay || {};

// TODO - rework this to be generic with passable options
RARay.splode = {
    
  init: function() {

    var _self = RARay.splode;

    _self.$container  = $('.card');
    _self.$wrapper    = $('.splode');
    _self.$boxes      = _self.$wrapper.find('.box');

    _self.bgPreload();
    _self.bind();
  },

  bind: function() {

    var _self = RARay.splode;

    _self.$container
      .on('click.show', 'button', function(e) {

        _self.show(e);
      });
  },

  bgPreload: function() {

    var _self = RARay.splode;

    // pre-load background images
    _self.$boxes
      .children('a')
        .each(function() {
      
          bgImage = $(this).css('background-image');
          bgImage = bgImage.substring(4, bgImage.length -1);

          $.get(bgImage);
        });
  },

  show: function(e) {

    var _self = RARay.splode,
        left  = e.pageX - _self.$container.offset().left + 'px',
        top   = e.pageY - _self.$container.offset().top + 'px';

    RARay.card.unbind();

    _self.$container.off('click.show');

    _self.$wrapper.show();

    _self.$boxes
      .each(function(i, box) {
        
        TweenMax.from(box, 0.15, {
          alpha: 0, 
          delay: i * 0.05
        });

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
  }
};
