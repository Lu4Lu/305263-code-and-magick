'use strict';
//
// Drag setup window
//
(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');

  var initCoords = {
    x: parseInt(setupDialogElement.style.left, 10),
    y: parseInt(setupDialogElement.style.top, 10)
  };
  // var setupDialogRect = setupDialogElement.getBoundingClientRect();

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // var startCoords = {
    //   x: initCoords.x,
    //   y: initCoords.y
    // };

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setupDialogElement.style.left = initCoords.x + 'px';
      setupDialogElement.style.top = initCoords.y + 'px';

      function onClickPreventDefault() {
        evt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
        startCoords = {
          x: initCoords.x,
          y: initCoords.y
        };
      }

      if (dragged) {
        onClickPreventDefault();
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
