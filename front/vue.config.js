const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("TodoList", resolve("src/views/TodoList"));
    config.resolve.alias.set("Login", resolve("src/views/Login"));
  }
};
