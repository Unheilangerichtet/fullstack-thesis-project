module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send({
      message: `Hello ${req.body.email}! your user was registered! Have fun!`,
    });
  });

  app.get('/input', (req, res) => {
    res.send({
      message: 'THIS IS A SUCCESS MESSAGE!',
    });
    console.log('req arrived!');
  });
};
