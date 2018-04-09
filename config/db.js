/*
* Author: gabrielhruiz
* */
const config = require('./index');

const mongodb = require('mongodb');

// Connection URL
const { db: { url } } = config;

// Database Name
const dbName = config.db.name;

const configuration = {
  poolSize: 50,
};

const getConnection = (callback) => {
  mongodb.MongoClient.connect(url, configuration, (err, client) => {
    if (err) {
      config.logger.error(`unexpected error getCollection: ${err}`);
      return err;
    }
    const db = client.db(dbName);
    return callback(db, client);
  });
};
module.exports.getConnection = getConnection;
