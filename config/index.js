/*
* Author: gabrielhruiz
* */
const dbConfig = require('./database');
const logger = require('./logger');
const router = require('./router');
const environment = require('./router');

module.exports = { dbConfig, logger, router, environment };
