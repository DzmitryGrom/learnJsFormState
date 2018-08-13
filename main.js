import States from './states.js';

const states = new States({
  name: 'maksim',
  age: '25'
});

pringState();

states.push({
  name: 'dima'
});

pringState();

states.push({
  age: '55'
});

pringState();

states.undo();

pringState();

function pringState() {
  console.log();
  console.log('====================');

  console.log('name:', states.get('name'));
  console.log('age:', states.get('age'));
  console.log();
  console.log('====================');
}

let throttle = function (payloadFunction, delayMs, callback, onError) {
  var intervalId,
    lastParamsApplied,
    params;
  return function () {
    params = arguments;
    lastParamsApplied = false;
    if (intervalId === undefined) {
      applyPayloadFunction();
      intervalId = setInterval(function () {
        if (!lastParamsApplied) {
          applyPayloadFunction();
        } else {
          clearInterval(intervalId);
          intervalId = undefined;
        }
      }, delayMs);
    }
    function applyPayloadFunction() {
      var result;
      try {
        result = payloadFunction.apply(null, params);
        lastParamsApplied = true;
        params = undefined;
        callback && callback(result);
      } catch (err) {
        if (onError) {
          onError(err);
        } else {
          console.error('Error in AppUtil.throttle:', err);
        }
      }
    }
  }
};

const btnUndo = document.querySelector('#undo'),
      inputName = document.querySelector('#name'),
      inputAge = document.querySelector('#age');

var throttleBlockElements = getBlockElemets('blockWithThrottle'),

  setValueInThrottle = throttle(getFormatedName, 1000, function (input) {
    console.dir(input)

    if (input.id === 'name') {
      states.push({
        name: input.value
      });

    }

    if (input.id === 'age') {
      states.push({
        age: input.value
      });

    }

    pringState();

  });


console.log('name:', states.get('name'));
console.log('age:', states.get('age'));
setInputListener(throttleBlockElements.input, setValueInThrottle);

function setInputListener(element, callback) {
  element.on('input', function (event) {

    var input = event.target;

    callback(input);
  });
}

function getBlockElemets(blockId) {
  var blockElement = $('#' + blockId);
  return {
    input: blockElement.find('input')
  }
}

function getFormatedName(input) {
  return input;
}

btnUndo.addEventListener('click', event => {
  states.undo();
  inputName.value = states.get('name') || '';
  inputAge.value = states.get('age') || '';

});