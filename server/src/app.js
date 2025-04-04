const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// require('./routes')(app);
const routes = require('./routes');
// console.log(routes); // This should log: [Function]
routes(app);

app.listen(process.env.PORT || config.port);
