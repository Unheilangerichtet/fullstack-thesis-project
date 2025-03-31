const inputController = require('./controllers/inputController');

module.exports = (app) => {
  app.post('/input', inputController.handleInputRequest);
};


