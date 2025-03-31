const childProcessService = require('../services/childProcessService');

exports.handleInputRequest = async (req, res) => {
  const { startSymbol, productions, word } = req.body;
  try {
    const result = await childProcessService.runChildProcess(word, productions, startSymbol);
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send({ message: 'An error occurred' });
  }
};
