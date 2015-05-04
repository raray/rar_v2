
var RARay = RARay || {};

// from https://remysharp.com/2010/07/21/throttling-function-calls
RARay.throttle = function(fn, threshhold, scope) {

  var last,
      deferTimer;

  threshhold = typeof threshhold !== 'undefined' ? threshhold : 250;
  
  return function () {
    
    var context = scope || this,
        now = +new Date(),
        args = arguments;
    
    if (last && now < last + threshhold) {
      
      // hold on to it
      clearTimeout(deferTimer);

      deferTimer = setTimeout(function () {
  
        last = now;
  
        fn.apply(context, args);
      }, threshhold);
    } 
    else {
      last = now;
  
      fn.apply(context, args);
    }
  };
};
