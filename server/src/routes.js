const path = require('path');
const { spawn } = require('child_process');
// inport * as path from 'path'

module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send({
      message: `Hello ${req.body.email}! your user was registered! Have fun!`,
    });
  });

  app.post('/input', async (req, res) => {
    const {startSymbol, productions, word} = req.body;

    try {
      const result = await runChildProcess(word, productions)
      console.log(result)
      res.status(200).send(result)
    } catch (err) {
      console.error(`Error: ${err}`)
      res.status(500).send({ message: 'An error occurred' });
    }
  });

  function runChildProcess(word, productions) {
    return new Promise((resolve, reject) => {
      // const goExecutable = path.join(__dirname, 'executables/CP-withP-Mark1.exe');
      // const goExecutable = path.join(__dirname, 'executables/CP-Mark4.exe');
      // const goExecutable = path.join(__dirname, 'executables/childProcessTwoLinux');
      const goExecutable = path.join(__dirname, 'executables/CP-wP-linux');
      const grammarJSON = formatProductions(productions);

      // Spawn the Go executable with the provided arguments
      const goProcess = spawn(goExecutable, [grammarJSON, word]);

      let result = '';

      // Collect data from the stdout of the Go process
      goProcess.stdout.on('data', (data) => {
          result += data.toString();
      });

      // Handle errors from the stderr of the Go process
      goProcess.stderr.on('data', (data) => {
          console.error(`Go stderr: ${data}`);
      });

      // Handle errors when starting the Go process
      goProcess.on('error', (err) => {
          reject(`Failed to start subprocess: ${err.message}`);
      });
      
      // Resolve or reject the promise based on the exit code of the Go process
      goProcess.on('close', (code) => {
          if (code !== 0) {
              reject(`Go process exited with code ${code}`);
          } else {
              resolve(result.trim());
          }
      });
  });
  }

  function formatProductions(productions) {
    // Split the productions string into an array of production rules
    const productionRules = productions.split(',');

    
    // Map each production rule to an object with leftSide and rightSide properties
    const mappedProductions = productionRules.map(rule => {
      const [leftSide, rightSide] = rule.split('->');
      return { leftSide, rightSide };
    });
    
    // Construct the JSON object expected by the Go code
    const grammar = {
      startSymbol: mappedProductions[0].leftSide,
      productions: mappedProductions
    };
    
    // Convert the JSON object to a JSON string
    const grammarJSON = JSON.stringify(grammar);
    return grammarJSON;
  }
};
