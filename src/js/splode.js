var RARay = RARay || {};

// TODO - rework this to be generic with passable options
RARay.splode = {
    
  init: function() {

    var _self = RARay.splode;

    _self.$container  = $('.card');
    _self.$wrapper    = $('.splode');
    _self.$boxes      = _self.$wrapper.find('.box');
    _self.clickLeft   = 0;
    _self.clickRight  = 0;

    _self.bgPreload();
    _self.bind();
  },

  bind: function() {

    var _self = RARay.splode;

    _self.$container
      .on('click.show', '.splode-show', function(e) {

        _self.show(e);
      })
      .on('click.hide', '.splode-hide', function(e) {

        _self.hide(e); 
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

  hide: function(e) {

    var _self = RARay.splode;

    _self.$boxes
      .each(function(i, box) {
        
        TweenMax.to(box, 0.75, {
          alpha     : 0,
          left      : _self.clickLeft, 
          top       : _self.clickRight, 
          width     : 0, 
          height    : 0,
          delay     : i * 0.05, 
          onComplete: function() {
        
            if (_self.$boxes.length === i + 1) {
              _self.$wrapper.hide();
              
              _self.$boxes.removeAttr('style');
              
              RARay.card.bind();
            }
          }
        });
      });
  },

  show: function(e) {

    var _self      = RARay.splode,
        clickLeft  = e.pageX - _self.$container.offset().left + 'px',
        clickRight = e.pageY - _self.$container.offset().top + 'px';

    RARay.card.unbind();

    _self.$wrapper.show();

    _self.$boxes
      .each(function(i, box) {
        
        TweenMax.from(box, 0.15, {
          alpha: 0, 
          delay: i * 0.05
        });

        TweenMax.from(box, 0.75, {
          left      : clickLeft, 
          top       : clickRight, 
          width     : 0, 
          height    : 0, 
          delay     : i * 0.05,
          ease      : Back.easeOut, 
          onComplete: function() {
              
            $(box).removeAttr('style');
          }
        });
      });
  }
};
