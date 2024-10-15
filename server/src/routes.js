const path = require('path');
const { spawn } = require('child_process');

module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send({
      message: `Hello ${req.body.email}! Your user was registered! Have fun!`,
    });
  });

  app.post('/input', async (req, res) => {
    const { startSymbol, productions, word } = req.body;
    try {
      const result = await runChildProcess(word, productions);
      console.log(result);
      res.status(200).send(result);
    } catch (err) {
      console.error(`Error: ${err}`);
      res.status(500).send({ message: 'An error occurred' });
    }
  });

  function runChildProcess(word, productions) {
    return new Promise((resolve, reject) => {
      const scripts = {
        win32: 'CP-withP-Mark1.exe',
        darwin: 'CP-compiled-on-Mac', 
        linux: 'cp-wP-linux'
      };
      const fallbackScripts = [
        scripts.win32,
        scripts.linux,
        scripts.darwin
      ];
      const grammarJSON = formatProductions(productions);
      tryNextScript(fallbackScripts, 0, word, grammarJSON, resolve, reject);
    });
  }

  function tryNextScript(scripts, index, word, grammarJSON, resolve, reject) {
    if (index >= scripts.length) {
      return reject('All scripts failed to execute.');
    }
    const script = scripts[index];
    const goExecutable = path.join(__dirname, `executables/${script}`);
    
    console.log(`Attempting to run ${script}...`);

    const goProcess = spawn(goExecutable, [grammarJSON, word]);

    let result = '';

    goProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
    goProcess.stderr.on('data', (data) => {
      console.error(`Go stderr: ${data}`);
    });
    goProcess.on('error', (err) => {
      console.error(`Failed to start subprocess with ${script}: ${err.message}`);
      tryNextScript(scripts, index + 1, word, grammarJSON, resolve, reject);
    });
    goProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Go process with ${script} exited with code ${code}`);
        tryNextScript(scripts, index + 1, word, grammarJSON, resolve, reject);
      } else {
        resolve(result.trim());
      }
    });
  }

  function formatProductions(productions) {
    const productionRules = productions.split(',');
    const mappedProductions = productionRules.map(rule => {
      const [leftSide, rightSide] = rule.split('->');
      return { leftSide, rightSide };
    });
    const grammar = {
      startSymbol: mappedProductions[0].leftSide,
      productions: mappedProductions,
    };
    const grammarJSON = JSON.stringify(grammar);
    return grammarJSON;
  }
};
