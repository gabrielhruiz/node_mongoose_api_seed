'use strict';

require('dotenv').config();
let fs = require('fs');
let config = require('./config');
let cluster = require('cluster');
let packageJson = require('./package.json');

let cronService = require('./api/v1/services/cronService');
let CronJob = require('cron').CronJob;
let _ = require('lodash');

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

if (!fs.existsSync('./temp')) {
  fs.mkdirSync('./temp');
}

if (process.env.NODE_ENV == 'production' && cluster.isMaster && process.env.MULTITHREADING) {
  let numWorkers = require('os').cpus().length,
    i, worker;

  config.logger.info('Master cluster setting up ' + numWorkers + ' workers...');

  for (i = 0; i < numWorkers; i++) {
    worker = cluster.fork();
    worker.on('message', function () {
      config.logger.debug('arguments', arguments);
    });
  }

  cluster.on('exit', function (deadWorker) {
    // Restart the worker
    let worker = cluster.fork();

    // Note the process IDs
    let newPID = worker.process.pid;
    let oldPID = deadWorker.process.pid;

    // Log the event
    config.logger.debug('worker ' + oldPID + ' died.');
    config.logger.debug('worker ' + newPID + ' born.');
  });

  // Cron tasks
  new CronJob({
    cronTime: config.cron.dummyCron,
    onTick: _.throttle(() => {
      let init = new Date();
      config.logger.info('[CRON] dummyCron started: ' + init);
      cronService.dummyCron("bitcoin", 1).then(response => {
          let duration = +new Date - +init;
          config.logger.info('[CRON] dummyCron finished: ' + duration + ' ms.');
      }, error => {
          let duration = +new Date - +init;
          config.logger.info('[ERROR CRON] dummyCron finished: ' + duration + ' ms. ERROR: ' + error);
      });
    }, 5000, {
      leading: true,
      trailing: false
    }),
    start: true,
    timeZone: 'Europe/Madrid'
  });

} else {

  config.logger.info('Worker ' + process.pid + ' is alive!');

  let express = require('express');
  let cookieParser = require('cookie-parser');
  let bodyParser = require('body-parser');
  let cors = require('cors');
  let request = require('request');
  let compression = require('compression');

  let app = express();
  app.use(compression());
  app.use(cors());
  app.use(cookieParser());
  let bodyParserJson = bodyParser.json({
    limit: '5mb'
  });
  let bodyParserUrl = bodyParser.urlencoded({
    limit: '5mb',
    extended: true,
    parameterLimit: 50000
  });

  // Routes
  let auth = require('./api/v1/controllers/authController');
  app.use('/api/v1', bodyParserUrl, bodyParserJson, auth);

  let news = require('./api/v1/controllers/newsController');
  app.use('/api/v1', bodyParserUrl, bodyParserJson, news);


  app.use('/', function (req, res) {
    res.json({
      name: packageJson.name,
      version: packageJson.version,
      mode: app.get('env')
    })
  });

  // Start the server
  let serverPort = process.env.PORT || config.port;
  let server = app.listen(serverPort, function () {
    config.logger.info('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    config.logger.info('Running in %s mode', app.get('env'));
  });
  server.timeout = 24 * 3600 * 1000; // 24h


  // Cron tasks
  if (!process.env.MULTITHREADING) {
      new CronJob({
          cronTime: config.cron.dummyCron,
          onTick: _.throttle(() => {
              let init = new Date();
              config.logger.info('[CRON] dummyCron started: ' + init);
              cronService.dummyCron("bitcoin", 1).then(response => {
                  let duration = +new Date - +init;
                  config.logger.info('[CRON] dummyCron finished: ' + duration + ' ms.');
              }, error => {
                  let duration = +new Date - +init;
                  config.logger.info('[ERROR CRON] dummyCron finished: ' + duration + ' ms. ERROR: ' + error);
              });
          }, 5000, {
              leading: true,
              trailing: false
          }),
          start: true,
          timeZone: 'Europe/Madrid'
      });
  }
}