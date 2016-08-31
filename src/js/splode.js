/* global jQuery */
/* global TweenMax */
/* global Back */

var RARay = RARay || {}

;(function ($, TweenMax, RARay) {
  var Self = RARay.Splode = {}

  // TODO - rework this to be generic with passable options
  Self.init = function () {
    Self.$container = $('.card')
    Self.$wrapper = $('.splode')
    Self.$boxes = Self.$wrapper.find('.splode__box')
    Self.clickLeft = 0
    Self.clickRight = 0

    Self.bgPreload()
    Self.bind()
  }

  Self.bind = function () {
    Self.$container
      .on('click.show', '.splode-show', function (e) {
        Self.show(e)
      })
      .on('click.hide', '.splode-hide', function (e) {
        Self.hide(e)
      })
  }

  Self.bgPreload = function () {
    // pre-load background images
    Self.$boxes
      .children('a')
      .each(function () {
        var bgImage = $(this).css('background-image')
        bgImage = bgImage.substring(5, bgImage.length - 2)

        $.get(bgImage)
      })
  }

  Self.hide = function (e) {
    Self.$boxes
      .each(function (i, box) {
        TweenMax.to(box, 0.75, {
          alpha: 0,
          left: Self.clickLeft,
          top: Self.clickRight,
          width: 0,
          height: 0,
          delay: i * 0.05,
          onComplete: function () {
            if (Self.$boxes.length === i + 1) {
              Self.$wrapper.hide()

              Self.$boxes.removeAttr('style')

              RARay.Card.bind()
            }
          }
        })
      })
  }

  Self.show = function (e) {
    var clickLeft = e.pageX - Self.$container.offset().left + 'px'
    var clickRight = e.pageY - Self.$container.offset().top + 'px'

    RARay.Card.unbind()

    Self.$wrapper.show()

    Self.$boxes
      .each(function (i, box) {
        TweenMax.from(box, 0.15, {
          alpha: 0,
          delay: i * 0.05
        })

        TweenMax.from(box, 0.75, {
          left: clickLeft,
          top: clickRight,
          width: 0,
          height: 0,
          delay: i * 0.05,
          ease: Back.easeOut,
          onComplete: function () {
            $(box).removeAttr('style')
          }
        })
      })
  }
}(jQuery, TweenMax, RARay))
