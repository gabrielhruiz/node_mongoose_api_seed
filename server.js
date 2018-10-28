require('dotenv').config();
const fs = require('fs');
const config = require('./config');
const cluster = require('cluster');
const packageJson = require('./package.json');
const numWorkers = require('os').cpus().length;
const cronJob = require('cron');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const _ = require('lodash');

const auth = require('./api/v1/controllers/authController');
const news = require('./api/v1/controllers/newsController');
const cronService = require('./api/v1/services/cronService');

const db = require('./config/connections/mongodb');

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

if (!fs.existsSync('./temp')) {
  fs.mkdirSync('./temp');
}

if (process.env.NODE_ENV === 'production' && cluster.isMaster && process.env.MULTITHREADING) {
  let i = 0;
  let worker;

  config.logger.info(`Master cluster setting up ${numWorkers} workers...`);

  for (i = 0; i < numWorkers; i++) {
    worker = cluster.fork();
    worker.on('message', () => {
      config.logger.debug('arguments', arguments);
    });
  }

  cluster.on('exit', (deadWorker) => {
    // Restart the worker
    worker = cluster.fork();

    // Note the process IDs
    const newPID = worker.process.pid;
    const oldPID = deadWorker.process.pid;

    // Log the event
    config.logger.debug(`worker ${oldPID} died.`);
    config.logger.debug(`worker ${newPID} born.`);
  });
} else {
  config.logger.info(`Worker ${process.pid} is alive!`);

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
  app.use('/api/v1', bodyParserUrl, bodyParserJson, auth);
  app.use('/api/v1', bodyParserUrl, bodyParserJson, news);

  app.use('/', (req, res) => {
    res.json({
      name: packageJson.name,
      version: packageJson.version,
      mode: app.get('env'),
    });
  });

  // Mongodb connection
  db.connect((err) => {
    if (err) {
      config.logger.error('Unable to connect to Mongo.');
      process.exit(1);
    } else {
      // Start the server
      const serverPort = process.env.PORT || config.port;
      const server = app.listen(serverPort, () => {
        config.logger.info('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        config.logger.info('Running in %s mode', app.get('env'));
      });
      server.timeout = 24 * 3600 * 1000; // 24h
    }
  });
}

// Cron task
const task = () => new cronJob.CronJob({
  cronTime: config.cron.dummyCron,
  onTick: _.throttle(() => {
    const init = new Date();
    config.logger.info(`[CRON] dummyCron started: ${init}`);
    cronService.dummyCron('bitcoin', 1).then(() => {
      const duration = +new Date() - +init;
      config.logger.info(`[CRON] dummyCron finished: ${duration} ms.`);
    }, (error) => {
      const duration = +new Date() - +init;
      config.logger.info(`[ERROR CRON] dummyCron finished: ${duration} ms. ERROR: ${error}`);
    });
  }, 5000, {
    leading: true,
    trailing: false,
  }),
  start: true,
  timeZone: 'Europe/Madrid',
});
task();
