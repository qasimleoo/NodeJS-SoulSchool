const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

let t = 1000;
myEmitter.on("event", () => {
    console.log("An event occurred!");
    setTimeout(() => {
        console.log("Chalo");
    }, t);
    t += 1000;
});
myEmitter.emit("event");

console.log("The script is running");

myEmitter.emit("event");
myEmitter.emit("event");
myEmitter.emit("event");
