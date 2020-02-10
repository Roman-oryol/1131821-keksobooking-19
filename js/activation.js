'use strict';

(function () {
  var MAP_PIN_RADIUS = 32;
  var MAP_PIN_HEIGHT = 84;

  var mapElement = document.querySelector('.map');
  var similarListOfferElement = mapElement.querySelector('.map__pins');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');
  var adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
  var adFilterFieldElements = mapElement.querySelectorAll('select');
  var mapFilterFeaturesElement = mapElement.querySelector('.map__features');
  var addressFieldElement = adFormElement.querySelector('#address');

  var changeStateFormElement = function (element, flag) {
    element.disabled = flag;
  };

  var changeStateFormCollection = function (collection, flag) {
    collection.forEach(function (item) {
      changeStateFormElement(item, flag);
    });
  };

  var getMapPinMainCoordinates = function (radius, height) {
    var coordinateX = parseInt(mapPinMainElement.style.left, 10);
    var coordinateY = parseInt(mapPinMainElement.style.top, 10);

    return coordinateX + radius + ', ' + (coordinateY + height);
  };

  var gettingInitialState = function (flag) {
    changeStateFormCollection(adFormFieldsetElements, flag);

    changeStateFormCollection(adFilterFieldElements, flag);

    changeStateFormElement(mapFilterFeaturesElement, flag);
  };

  var activateMap = function () {
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    gettingInitialState(false);
    addressFieldElement.value = getMapPinMainCoordinates(MAP_PIN_RADIUS, MAP_PIN_HEIGHT);
    similarListOfferElement.appendChild(window.pin.getListOfferElement(window.data.createArrayOffers(8)));
  };

  gettingInitialState(true);

  addressFieldElement.value = getMapPinMainCoordinates(MAP_PIN_RADIUS, MAP_PIN_RADIUS);

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    if (mapElement.classList.contains('map--faded')) {
      window.util.isLeftMouseEvent(evt, activateMap);
    }
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (mapElement.classList.contains('map--faded')) {
      window.util.isEnterEvent(evt, activateMap);
    }
  });
})();
