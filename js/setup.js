'use strict';
var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

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
    window.wizards.push(wizard);
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
for (var i = 0; i < window.wizards.length; i++) {
  fragment.appendChild(renderWizard(window.wizards[i]));
}
similarListElement.appendChild(fragment);

// userDialog.querySelector('.setup-similar').classList.remove('hidden');
// module4-task1
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupOpen = document.querySelector('.setup-open');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

// function opening popup
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// random array item
function getRandomItemFromArray(arr) {
  return arr[getRandomIndex(arr)];
}

// fill wizard options color
var fillWizardCoat = function () {
  var randomCoatColor = getRandomItemFromArray(COAT_COLORS);
  wizardCoat.style.fill = randomCoatColor;
  setup.querySelector('input[name="coat-color"]').value = randomCoatColor;
};

var fillWizardEyes = function () {
  var randomEyesColor = getRandomItemFromArray(EYES_COLORS);
  wizardEyes.style.fill = randomEyesColor;
  setup.querySelector('input[name="eyes-color"]').value = randomEyesColor;
};

var fillWizardFireball = function () {
  var randomFireballColor = getRandomItemFromArray(FIREBALL_COLORS);
  wizardFireball.style.background = randomFireballColor;
  setup.querySelector('input[name="fireball-color"]').value = randomFireballColor;
};

// change color by click
wizardCoat.addEventListener('click', function () {
  fillWizardCoat();
});

wizardEyes.addEventListener('click', function () {
  fillWizardEyes();
});

wizardFireball.addEventListener('click', function () {
  fillWizardFireball();
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// open setup by mouse click on setupOpen
setupOpen.addEventListener('click', function () {
  openPopup();
});

// close setup by mouse click on setupClose
setupClose.addEventListener('click', function () {
  closePopup();
});

// open setup by press enter on setupClose
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// forbid esc press if the focus is on user name
userNameInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});


// open setup by press enwter on setup close
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// submit form by press enter on submit
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
