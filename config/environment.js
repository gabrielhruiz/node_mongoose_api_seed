const dotEnv = require('dotenv');
const { logger } = require('./logger');

const config = dotEnv.config();

if (config.error) {
  logger.error(`Getting environment variables: ${config.error.toString()}`);
}

module.exports = config.parsed;
