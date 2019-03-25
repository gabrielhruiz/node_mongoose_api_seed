const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
dotenv.config();

const packageJson = require('./package.json');
const { dbConfig, logger } = require('./config');
dbConfig.loadDB();

const auth = require('./api/controllers/authentication');
const user = require('./api/controllers/user');
const kawaii = require('./api/controllers/kawaii');

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

if (!fs.existsSync('./temp')) {
  fs.mkdirSync('./temp');
}

const app = express();
app.use(compression());
app.use(cors());
app.use(cookieParser());
const bodyParserJson = bodyParser.json({
  limit: '5mb',
});
const bodyParserUrl = bodyParser.urlencoded({
  limit: '5mb',
  extended: true,
  parameterLimit: 50000,
});

// Routes
const API_VERSION = process.env.API_VERSION;
app.use(`/${API_VERSION}`, bodyParserUrl, bodyParserJson, [auth, user, kawaii]);

app.use('/', (req, res) => {
  res.json({
    name: packageJson.name,
    version: packageJson.version,
    mode: app.get('env'),
  });
});

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV || 'development';
const server = app.listen(PORT, () => {
  logger.info(`Your server is listening on port ${PORT} (http://localhost:${PORT})`);
  logger.info(`Running in ${NODE_ENV} mode`);
});
server.timeout = 24 * 3600 * 1000; // 24h
