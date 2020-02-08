'use strict';

(function () {
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

  window.pin = {
    getListOfferElement: getListOfferElement
  };
})();
