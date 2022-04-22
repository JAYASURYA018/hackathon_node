console.log("Hello guys");

const express = require("express");
const app = express();
const PORT = 7000;

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.listen(PORT, () => console.log("The server is Started in", PORT));
