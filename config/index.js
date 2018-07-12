/*
* Author: gabrielhruiz
* */
const conf = require('config');
const winston = require('winston');

const config = conf.get(process.env.NODE_ENV ? process.env.NODE_ENV : 'development');
module.exports = config;

const logConfig = {
  levels: {
    error: 7,
    warning: 8,
    info: 9,
    chat: 10,
    debug: 11,
  },
  colors: {
    error: 'red',
    warning: 'yellow',
    info: 'white',
    debug: 'blue',
    chat: 'green',
  },
};


module.exports.logger = new winston.Logger({
  levels: logConfig.levels,
  colors: logConfig.colors,
  transports: [
    new winston.transports.File({
      level: 'debug',
      filename: config.logFile,
      handleExceptions: true,
      json: false,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'info',
      handleExceptions: true,
      json: false,
      colorize: false,
      timestamp: false,
    }),
  ],
  exitOnError: false,
});
