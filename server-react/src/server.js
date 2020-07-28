const express = require("express");
const app = express();
const server = require("http").Server(app);

server.listen(2000);
console.log("Server started");

app.use(
  express.static(__dirname + "/client", {
    extensions: ["html"]
  })
);
app.use(express.json());
