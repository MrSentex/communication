# Communication
Alt:V Client-Server Communication

![banner](https://i.imgur.com/a8HhOWf.png)

## What does the script do?

The script provides the user with a simple **API** to make requests to the server and receive an asynchronous response from it, thus making the life of the developers simpler when it comes to receiving information from the server. The **API** is similar to the *ESX API* of **FiveM** so that developers coming from that platform will quickly become familiar with it.

## Why use it?

As an Alt:V developer you will need to receive a lot of information from the server and with this script you will save many lines of code and headaches making your scripts more sexy. So... **what you wating for?** add this fancy script to your server and start to relax with knowing you do not need all this *bizarre* events you use to use in your scripts.

## How do I used it?

As I said it's quite simple and you'll understand it quickly.

Commented example:
```js
// Server-Side
import * as communication from "communication"; // Importing the module

// @event - The event you want register
// @player - Alt player object
// @cb - Callback function
// @target argument passed by client (you can add every argument you want but need to be passed by the client, if not the value of the argument will be undefined)
communication.registerServerCallback("player=>get_hwid", (player, cb, target) => {
  if (!target) {
    target = player; // If not target especified taking self as one
  } else {
    target = alt.Player.getByID(target); // Getting alt player by ID
  }
  
  if (!target) {
    cb();
    return;
  }
  
  cb(target.hwidHash); // Sending hwid back to client
});

```

```js
// Client-Side
import * as communication from "communication"; // Importing the module

// @event - The event you want to trigger
// @callback - Callback function adding the arguments you want to recieve
// @...args - All arguments you want to pass to the server (No arguments in this example)
communication.triggerServerCallback("player=>get_hwid", (hwid) => {
  alt.log("Self hwid: " + hwid); // Writing your hwid in the client console
});

// @event - The event you want to trigger
// @callback - Callback function adding the arguments you want to recieve
// @id - Player ID you want to get its hwid
communication.triggerServerCallback("player=>get_hwid", (hwid) => {
  alt.log("Player with ID 1 hwid: " + hwid); // Writing player id 1 hwid in the client console
}, 1);
```

# Exported functions
Functions are exported from the module.
## Server
* registerServerCallback(event, callback)
  > Register a new event who will trigger your callback function when is call.
## Client
* triggerServerCallback(event, callback, ...args)
  > Trigger an event you registered in server side passing the arguments and getting the response.
