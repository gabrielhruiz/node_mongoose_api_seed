const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

const packageJson = require('./package.json');
const { dbConfig, logger, router, environment } = require('./config');

const { NODE_ENV, PORT } = environment;

dbConfig.loadDB();

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
router.generateAPIRoutes(app);
app.use('/', (req, res) => {
  res.json({
    name: packageJson.name,
    version: packageJson.version,
    mode: app.get('env'),
  });
});

const ENV = NODE_ENV || 'development';
const server = app.listen(PORT, () => {
  logger.info(`Your server is listening on port ${PORT} (http://localhost:${PORT})`);
  logger.info(`Running in ${ENV} mode`);
});
server.timeout = 24 * 3600 * 1000; // 24h
