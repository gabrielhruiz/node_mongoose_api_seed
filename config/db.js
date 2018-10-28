/*
* Author: gabrielhruiz
* */
const config = require('./index');

const { MongoClient } = require('mongodb');

// Connection URL
const { db: { url } } = config;

// Database Name
const dbName = config.db.name;

const configuration = {
  poolSize: 50,
};

let database = null;

MongoClient.connect(url, configuration, (err, client) => {
  if (err) {
    config.logger.error(`unexpected error getCollection: ${err}`);
    return err;
  }
  config.logger.info(`Database connection successfully: ${dbName}`);
  database = client.db(dbName);
  return database;
});

exports.db = database;

