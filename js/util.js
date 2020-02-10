'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var BUTTON_LEFT_MOUSE_KEY = 0;

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var isLeftMouseEvent = function (evt, action) {
    if (evt.button === BUTTON_LEFT_MOUSE_KEY) {
      action();
    }
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isLeftMouseEvent: isLeftMouseEvent
  };
})();
