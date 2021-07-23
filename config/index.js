/*
* Author: gabrielhruiz
* */
const dbConfig = require('./database');
const logger = require('./logger');
const router = require('./router');
const environment = require('./environment');

module.exports = { dbConfig, logger, router, environment };
