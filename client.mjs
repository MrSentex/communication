import * as alt from "alt";
// import * as utils from "utils"; My utils resource

var counter = 0;
var ClientCallbacks = {};

function getCounter() {
    counter++;
    return counter;
}

alt.onServer("communication=>response", (event, id, args) => {
    ClientCallbacks[event][id](...args);
    delete ClientCallbacks[event][id];
})

export function triggerServerCallback(event, callback, ...args) {
    if (args == null or args == undefined) {
        args = [];
    }
    
    // var id = utils.Random.getCounter(); Using my utils resource (Possibly not public <3)
    var id = getCounter();

    if (!ClientCallbacks[event]) {
        ClientCallbacks[event] = [];
    }

    ClientCallbacks[event][id] = callback;

    alt.emitServer(event, id, ...args);
}
