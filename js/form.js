'use strict';

var adFormElement = document.querySelector('.ad-form');
var numberOfRoomsElement = adFormElement.querySelector('#room_number');
var numberOfGuestsElement = adFormElement.querySelector('#capacity');

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

adFormElement.addEventListener('change', function () {
  createMessageForInvalidGuests();
});
