/* global jQuery */
/* global TweenMax */

var RARay = RARay || {}

;(function ($, TweenMax, RARay) {
  var Self = RARay.Card = {}

  Self.init = function () {
    Self.$card = $('.card')
    Self.$shine = $('#card-logo-shine')
    Self.curRotationY = 0
    Self.shineMod = -3

    Self.setCardSizes()
    Self.bind()
  }

  Self.bind = function () {
    Self.$card
      .on('mousemove.card', function (e) {
        if (!$(e.target).is('button, a')) {
          Self.hint(e)
        } else {
          Self.dehint()
        }
      })
      .on('mouseout.card', function (e) {
        Self.dehint()
      })
      .on('click.card', function (e) {
        if (!$(e.target).is('a, button')) {
          Self.flip(e)
        }
      })

    // TODO - is there a way around this hack?
    $(window).on('resize', function () {
      var translationY = 0

      if (RARay.Breakpoints.get() === 'large') {
        translationY = -175
      }

      TweenMax.to(Self.$card, 0, {
        y: translationY
      })

      Self.setCardSizes()
    })
  }

  Self.dehint = function () {
    if (RARay.Breakpoints.get() !== 'large') {
      return
    }

    TweenMax.to(Self.$card, 0.6, {
      rotationY: Self.curRotationY
    })

    TweenMax.to(Self.$shine, 0.6, {
      backgroundPosition: '0 0'
    })
  }

  Self.flip = function (e) {
    var coordX = Math.round((e.offsetX - Self.cardMidX) / Self.sliceWidth)
    var rotationY = 0

    // flip left or right - around the Y axis
    if (coordX >= 0) {
      rotationY = 180
    } else {
      rotationY = -180
    }

    Self.curRotationY += rotationY

    TweenMax.to(Self.$card, 0.6, {

      // the -0.01 is a silly hack to make sure the rotation happens in the correct direction
      rotationY: Self.curRotationY - 0.01
    })
  }

  Self.hint = function (e) {
    if (RARay.Breakpoints.get() !== 'large') {
      return
    }

    var eventX = e.pageX - $(e.delegateTarget).offset().left
    var coordX = (eventX - Self.cardMidX) / Self.sliceWidth

    TweenMax.to(Self.$card, 0.6, {
      rotationY: coordX + Self.curRotationY
    })

    TweenMax.to(Self.$shine, 0.6, {
      backgroundPosition: (Self.shineMod * coordX) + 'px 0'
    })
  }

  Self.setCardSizes = function () {
    Self.cardWidth = Self.$card.width()
    Self.cardMidX = Self.cardWidth / 2
    Self.sliceWidth = Self.cardWidth / 20
  }

  Self.unbind = function () {
    Self.$card.off('.card')

    Self.dehint()
  }
}(jQuery, TweenMax, RARay))
