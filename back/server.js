const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const protectMiddleware = require("./middlewares/protectedMiddleware");

const getTodosResolver = require("./todosResolvers/getTodosResolver");

const authResolver = require("./authResolvers/authResolver");
const authAutoResolver = require("./authResolvers/authAutoResolver");

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/todos", protectMiddleware, getTodosResolver);

app.post("/auth", authResolver);
app.post("/authAuto", authAutoResolver);

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`);
});
