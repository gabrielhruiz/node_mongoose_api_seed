/*
* Author: gabrielhruiz
* */
'use strict';

let config = require('./index');

let MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = config.db.url;

// Database Name
const dbName = config.db.name;

let configuration = {
    poolSize: 50
};

let getConnection = function (callback) {
    MongoClient.connect(url, configuration, function(err, client) {
        if (err) {
            config.logger.error('unexpected error getCollection: ' + err);
            return err;
        }
        let db = client.db(dbName);
        callback(db, client);
    });
};
module.exports.getConnection = getConnection;