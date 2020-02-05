'use strict';

var ENTER_KEY = 'Enter';
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
var numberOfRoomsElement = adFormElement.querySelector('#room_number');
var numberOfGuestsElement = adFormElement.querySelector('#capacity');

var createArrayOffers = function (amountElements) {
  var offers = [];
  var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
  var offerCheckinTimes = ['12:00', '13:00', '14:00'];
  var offerCheckoutTimes = ['12:00', '13:00', '14:00'];
  var offerTitles = ['Теремок', 'Дом на курьих ножках', 'Лубяная избушка', 'Ледяная избушка', 'Лучшая квартира', 'Шикарный дом', 'Коммуналка', 'Комфортный сарай'];
  var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var offerDescriptions = ['Теремок со всеми жителями без медведя', 'Ножка одна, дверца одна', 'Очень крепкая', 'Пока не расстаяла', 'От соседей будете в восторге', 'Такого шика вы еще не видели', 'Окунитесь в настоящую культуру', 'Все доступно на расстоянии вытянутой руки'];
  var offerIndexUrlAvatars = [1, 2, 3, 4, 5, 6, 7, 8];

  var getRandomIntFromRange = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
  };

  var getRandomLocationX = function () {
    var widthElement = document.querySelector('.map__pins').offsetWidth;
    var locationX = getRandomInt(widthElement);

    return locationX;
  };

  var getSimilarOffer = function (offerTitle, offerDescription, offerIndexUrlAvatar) {
    var urlAvatar = 'img/avatars/user' + '0' + offerIndexUrlAvatar + '.png';
    var offerAddress = getRandomLocationX() + ', ' + getRandomIntFromRange(130, 630);
    var offerPrice = getRandomIntFromRange(10000, 50000);
    var offerType = offerTypes[getRandomInt(offerTypes.length)];
    var offerRooms = getRandomIntFromRange(1, 3);
    var offerGuests = getRandomIntFromRange(1, 5);
    var offerCheckin = offerCheckinTimes[getRandomInt(offerCheckinTimes.length)];
    var offerCheckout = offerCheckoutTimes[getRandomInt(offerCheckoutTimes.length)];
    var getRandomOfferFeatures = function () {
      offerFeatures.length = getRandomIntFromRange(1, offerFeatures.length);
      return offerFeatures;
    };
    var getRandomOfferPhotos = function () {
      offerPhotos.length = getRandomIntFromRange(1, offerPhotos.length);
      return offerPhotos;
    };
    var similarOffer = {
      autor: {
        avatar: urlAvatar
      },
      offer: {
        title: offerTitle,
        addres: offerAddress,
        price: offerPrice,
        type: offerType,
        rooms: offerRooms,
        guests: offerGuests,
        checkin: offerCheckin,
        checkout: offerCheckout,
        features: getRandomOfferFeatures(),
        description: offerDescription,
        photos: getRandomOfferPhotos()
      },
      location: {
        x: getRandomLocationX(),
        y: getRandomIntFromRange(130, 630)
      }
    };

    return similarOffer;
  };

  for (var i = 0; i < amountElements; i++) {
    offers[i] = getSimilarOffer(offerTitles[i], offerDescriptions[i], offerIndexUrlAvatars[i]);
  }

  return offers;
};

var similarOfferPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderSimilarOffer = function (offer) {
  var offerElelement = similarOfferPinTemplate.cloneNode(true);
  var halfWidthElement = 25;
  var heightElement = 70;
  offerElelement.style.left = offer.location.x - halfWidthElement + 'px';
  offerElelement.style.top = offer.location.y - heightElement + 'px';
  offerElelement.querySelector('img').src = offer.autor.avatar;
  offerElelement.querySelector('img').alt = offer.offer.title;

  return offerElelement;
};

var getListOfferElement = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderSimilarOffer(offers[i]));
  }

  return fragment;
};

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
  similarListOfferElement.appendChild(getListOfferElement(createArrayOffers(8)));
};

var createMessageForInvalidGuests = function () {
  var target = numberOfGuestsElement;
  var numberGuests = target.value;
  var numberRooms = numberOfRoomsElement.value;
  if ((numberGuests > numberRooms || numberGuests === '0') && numberRooms !== '100') {
    target.setCustomValidity('Выберете, пожалуйста, количество гостей не более ' + numberRooms);
  } else if (numberRooms === '100' && numberGuests !== '0') {
    target.setCustomValidity('Выберете, пожалуйста, пункт "Не для гостей"');
  } else {
    target.setCustomValidity('');
  }
};

gettingInitialState(true);

addressFieldElement.value = getMapPinMainCoordinates(MAP_PIN_RADIUS, MAP_PIN_RADIUS);

mapPinMainElement.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activateMap();
  }
});

mapPinMainElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activateMap();
  }
});

adFormElement.addEventListener('change', function () {
  createMessageForInvalidGuests();
});
