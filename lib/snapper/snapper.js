/**
 * Module dependencies.
 */

var Snap = require('Snap.js');
var bus = require('bus');
var o = require('query');

exports = module.exports = function refresh(ctx) {
  ctx = ctx || document;

  var snapper = new Snap({
    element: o('#snap-content'),
    disable: 'right',
    touchToDrag: false,
    hyperextensible: false
  });

  var myToggleButton = o('#toggleButton', ctx);

  myToggleButton && myToggleButton.addEventListener('click', function(e) {
    e.preventDefault();

    if("left" === snapper.state().state) {
      snapper.close();
    } else {
      snapper.open('left');
    }
  });

  bus.on('page:change', onPageChange);

  function onPageChange () {
    snapper.close();
  };

  exports.snapper = snapper;
  exports.close = snapper.close;
  exports.destroy = function () {
    bus.off('page:change', onPageChange);
  };
}