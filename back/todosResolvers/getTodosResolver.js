const { readFile } = require("../helpers/workWithFiles");

const getTodosResolver = pathToDB => async (req, res) => {
  try {
    const todos = await readFile(pathToDB);
    return res.send(todos);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = getTodosResolver("db/todos.json");
