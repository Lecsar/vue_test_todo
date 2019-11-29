const fsp = require("fs").promises;

const readFile = async pathToFile => {
  try {
    const data = await fsp.readFile(pathToFile);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error("Reading file error");
  }
};

const writeFile = async (pathToFile, data) => {
  try {
    await fsp.writeFile(pathToFile, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Writing file error");
  }
};

module.exports = {
  readFile,
  writeFile
};
