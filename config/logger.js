const winston = require('winston');

const { NODE_ENV } = require('./environment');

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) =>
  `${timestamp} [${label}] ${level}: ${message}`);

const levelConfig = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
  },
  colors: {
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'bold red'
  }
};

const logger = createLogger({
  levels: levelConfig.levels,
  format: combine(
    label({ label: 'BACKEND' }),
    timestamp(),
    winston.format.colorize(),
    myFormat
  ),
  transports: [new transports.Console()]
});

if (NODE_ENV === 'production') {
  logger.add(new winston.transports.File({ filename: 'error.log', level: 'error' }));
  logger.add(new winston.transports.File({ filename: 'combined.log' }));
}

module.exports = logger;
