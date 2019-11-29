const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const authResolver = require("./authResolvers/authResolver");
const authAutoResolver = require("./authResolvers/authAutoResolver");

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.post("/auth", authResolver);
app.post("/authAuto", authAutoResolver);

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`);
});
