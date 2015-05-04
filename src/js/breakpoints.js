
var RARay = RARay || {};

RARay.breakpoints = {

  // from http://tech.particulate.me/javascript/2013/10/10/how-to-conveniently-check-for-responsive-breakpoints-in-javascript/
  get: function() {

    var tag = window.getComputedStyle(document.body,':after');
        tag = tag.getPropertyValue('content');
        tag = tag.replace( /"/g,'');   // Firefox bugfix

    return tag;
  }
};
