var RARay = RARay || {};

RARay.card = {

  init: function() {

    var _self = RARay.card;
    
    _self.$card        = $('.card');
    _self.cardWidth    = _self.$card.width();
    _self.cardMidX     = _self.cardWidth / 2;
    _self.sliceWidth   = _self.cardWidth / 20;
    _self.curRotationY = 0;

    _self.bind();
  },

  bind: function() {

    var _self = RARay.card;

    _self.$card
      .on('mousemove.card', function(e) {

        if ( ! $(e.target).is('button, a')) {
          _self.hint(e);
        }
        else {
          _self.dehint();
        }
      })
      .on('mouseout.card', function(e) {
        
        _self.dehint();
      })
      .on('click.card', function(e) {
      
        if ( ! $(e.target).is('a, button')) {
          _self.flip(e);
        }
      });
  },

  dehint: function() {
    
    var _self = RARay.card;

    TweenMax.to(_self.$card, 0.6, {
      rotationY: _self.curRotationY
    });
  },

  unbind: function() {

    var _self = RARay.card;

    _self.$card.off('.card');

    _self.dehint();
  },

  flip: function(e) {

    var _self       = RARay.card,
        coordX      = Math.round((e.offsetX - _self.cardMidX) / _self.sliceWidth),        
        rotationY   = 0;

    // flip left or right - around the Y axis
    if (coordX >= 0) {
      rotationY = 180;
    }
    else {
      rotationY = -180;
    }
    
    _self.curRotationY += rotationY;

    TweenMax.to(_self.$card, 0.6, {
      rotationY: _self.curRotationY - 1
    });
  },

  hint: function(e) {
    
    var _self  = RARay.card,
        eventX = e.pageX - $(e.delegateTarget).offset().left,
        coordX = (eventX - _self.cardMidX) / _self.sliceWidth;

    TweenMax.to(_self.$card, 0.6, {
      rotationY: coordX + _self.curRotationY
    });
  }
};
