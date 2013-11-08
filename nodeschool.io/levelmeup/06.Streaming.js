"use strict";

var level = require("level"),

    pathToDatabase = process.argv[2],
    db = level(pathToDatabase);

db.createReadStream().on("data", function(data) {
  console.log("%s=%s", data.key, data.value);
}).on("error", function(error) {
  if (error) {
    throw error;
  }
})