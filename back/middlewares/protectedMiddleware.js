const { readFile } = require("../helpers/workWithFiles");

const protectPath = pathToDB => async (req, res, next) => {
  try {
    const { Authorization } = req.headers;

    if (Authorization) {
      const users = await readFile(pathToDB);
      const findedUser = users.find(u => u.token === Authorization);

      if (findedUser) {
        next();
      } else {
        return res.send("Expired token");
      }
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = protectPath("../db/users.json");
