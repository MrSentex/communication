import * as alt from "alt";

function createCallback(event, player, id) {
    return (...args) => {
        alt.emitClient(player, "communication=>response", event, id, args);
    }
}

export function registerServerCallback(event, callback) {
    alt.onClient(event, (player, id, ...args) => {
        callback(player, createCallback(event, player, id), ...args)
    });
}