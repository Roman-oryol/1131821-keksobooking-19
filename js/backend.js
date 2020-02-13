'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
