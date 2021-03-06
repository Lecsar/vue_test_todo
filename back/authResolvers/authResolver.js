const generateToken = require("uuid/v1");
const { readFile, writeFile } = require("../helpers/workWithFiles");

const authResolver = pathToDB => async (req, res) => {
  const { login, password } = req.body;

  try {
    const users = await readFile(pathToDB);
    const findedUser = users.find(
      u => u.login === login && u.password === password
    );

    if (findedUser) {
      findedUser.token = generateToken();
      findedUser.refreshToken = generateToken();
      findedUser.timeExpiredToken = Date.now();
      findedUser.timeExpiredStartRefreshToken = Date.now();

      const { password, timeStartRefreshToken, ...response } = findedUser;

      try {
        await writeFile(pathToDB, users);
        return res.send(response);
      } catch (writeError) {
        return res.sendStatus(503);
      }
    }

    return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = authResolver("db/users.json");
