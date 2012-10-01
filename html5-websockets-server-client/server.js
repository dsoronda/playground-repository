/*jshint es5:true*/
require("colors");

var express = require("express"),
    utils = require("util"),
    wsio = require("websocket.io"),

    app = express.createServer();
    ws = wsio.attach(app);

app.use(express.static("public"));

ws.on("connection", function(socket) {
    socket.on("message", function(message) {
        console.log(utils.format("Message handled: %s", message).blue);
        socket.send(message);
    });
});

app.listen(3000);