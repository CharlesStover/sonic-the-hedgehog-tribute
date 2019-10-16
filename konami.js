var EVENT_LISTENER_OPTIONS = {
  passive: true
};

var KONAMI_CODE = [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13 ];
var KONAMI_CODE_LENGTH = KONAMI_CODE.length;

var entered = [];

var events = Object.create(null);

var lastId = 0;

function add(f) {
  lastId++;
  var id = lastId.toString();
  events[id] = f;
  if (Object.keys(events).length === 1) {
    window.addEventListener('keydown', onWindowKeyDown, EVENT_LISTENER_OPTIONS);
  }
  return function() {
    remove(id);
  };
}

function isValid() {

  // For each character in the Konami code,
  var enteredLength = entered.length;
  for (var x = 0; x < KONAMI_CODE_LENGTH; x++) {

    // If they haven't even entered this many characters, then they can't have entered the full code.
    if (enteredLength <= x) {
      return false;
    }

    /*
    If this character in the Konami code does not match, remove all entries up to this point.
    "up, up, down, down, left, up" becomes just "up" as the user attempts to start the code over.
    "up, up, down, down, left, D" becomes nothing as the user is no longer entering the Konami code.
    */
    if (entered[x] !== KONAMI_CODE[x]) {
      entered.splice(
        0,
        entered.length -
        (
          entered[x] === KONAMI_CODE[0] ?
            1 :
            0
        )
      );
      return false;
    }
  }

  // If we haven't returned an error yet, then the code was accurate in its entirety. Reset and validate it.
  entered.splice(0, entered.length);
  return true;
}

function onWindowKeyDown(e) {
  var keyCode = e.keyCode;

  // Log the key press.
  entered.push(keyCode);

  // If the last entered keys equate to the Konami code,
  if (isValid()) {

    // Execute each function in the queue.
    var eventKeys = Object.keys(events);
    for (var x = 0; x < eventKeys.length; x++) {
      var eventKey = eventKeys[x];
      var event = events[eventKey];
      event(function() {
        event(eventKey);
      });
    }
  }
}

function remove(id) {
  if (!events[id]) {
    return false;
  }
  delete events[id];
  if (Object.keys(events).length === 0) {
    window.removeEventListener('keydown', onWindowKeyDown, EVENT_LISTENER_OPTIONS);
  }
  return true;
}

window.Konami = {
  add: add,
  remove: remove,
};
