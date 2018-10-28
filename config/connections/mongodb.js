const { MongoClient } = require('mongodb');
const config = require('../../config');

const { url, name } = config.db;
const state = {
  db: null,
};

exports.connect = (done) => {
  if (state.db) {
    return done();
  }

  return MongoClient.connect(url, (err, client) => {
    if (err) {
      return done(err);
    }

    state.db = client.db(name);
    return done();
  });
};

exports.get = () => state.db;

exports.close = (done) => {
  if (state.db) {
    state.db.close((err, result) => {
      if (err) {
        return done(err);
      }
      state.db = null;
      state.mode = null;
      return done(result);
    });
  }
};
