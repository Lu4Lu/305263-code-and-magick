'use strict';
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                            .content
                            .querySelector('.setup-similar-item');


var MOCK_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var MOCK_LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var MOCK_COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var MOCK_EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// random from range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// random array index
function getRandomIndex(arr) {
  return getRandomInt(0, arr.length - 1);
}

// remove randomly an array element
function getRandomItemFromArrayAndRemoveItem(arr) {
// search for the index
  var index = getRandomIndex(arr);
  var item = arr[index];
  // remove this item from array
  arr.splice(index, 1);
  // remove the item from array (foreeeeeveeer!)
  return item;
}

(function mockWizard() {

  window.wizards = [];

  for (var i = 0; i < 4; i++) {
    var wizard = {
      name: getRandomItemFromArrayAndRemoveItem(MOCK_NAMES) + ' '
      + getRandomItemFromArrayAndRemoveItem(MOCK_LAST_NAMES),
      coatColor: getRandomItemFromArrayAndRemoveItem(MOCK_COAT_COLOR),
      eyesColor: getRandomItemFromArrayAndRemoveItem(MOCK_EYES_COLOR)
    };
    wizards.push(wizard);
  }
})();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
