'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var similarListOfferElement = mapElement.querySelector('.map__pins');
  var similarOfferPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var renderSimilarOffer = function (offer) {
    var offerElelement = similarOfferPinTemplate.cloneNode(true);
    var halfWidthElement = 25;
    var heightElement = 70;
    offerElelement.style.left = offer.location.x - halfWidthElement + 'px';
    offerElelement.style.top = offer.location.y - heightElement + 'px';
    offerElelement.querySelector('img').src = offer.author.avatar;
    offerElelement.querySelector('img').alt = offer.offer.title;

    return offerElelement;
  };

  var onLoad = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      if (offers[i].offer) {
        fragment.appendChild(renderSimilarOffer(offers[i]));
      }
    }

    similarListOfferElement.appendChild(fragment);


  };

  window.pin = {
    onLoad: onLoad
  };
})();
