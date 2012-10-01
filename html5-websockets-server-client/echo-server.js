/*jshint es5:true*/
require("colors");

var express = require("express"),
    utils = require("util"),
    wsio = require("websocket.io"),

    app = express(),
    ws = wsio.attach(app);

app.use(express.static("public"));

ws.on("connection", function(socket) {
    console.log("Connected!".yellow);

    socket.on("message", function(message) {
        console.log(utils.format("Message handled: %s", message).blue);
        socket.send("Pong!");
    });
});

app.listen(3000);
console.log("Server is listening on port 3000...".red);