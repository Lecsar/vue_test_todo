const { readFile } = require("../helpers/workWithFiles");

const authAutoResolver = pathToDB => async (req, res) => {
  const { token } = req.body;

  try {
    const users = await readFile(pathToDB);
    const findedUser = users.find(u => u.token === token);

    if (findedUser) {
      const { password, ...response } = findedUser;
      return res.send(response);
    }

    return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = authAutoResolver("../db/users.json");
