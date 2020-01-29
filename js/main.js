'use strict';

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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListOffer = map.querySelector('.map__pins');

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

similarListOffer.appendChild(getListOfferElement(createArrayOffers(8)));
