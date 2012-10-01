/*jshint es5: true*/
require("colors");

var express = require("express"),
    io = require("socket.io"),
    utils = require("util"),
    http = require('http'),

    app = express(),
    server = http.createServer(app),
    socket;

server.listen(3000);

app.use(express.static("public"));

socket = io.listen(server);

socket.on("connection", function(client) {

  client.on("message", function(message) {
    console.log(utils.format("Message received [%s]", message).blue);
    client.send("Pong!");
  });


  client.on("disconnect", function() {
    console.log("Client disconnected!".yellow);
  });

});