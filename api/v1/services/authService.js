/*
* Author: gabrielhruiz
* */
const config = require('./../../../config');
const db = require('./../../../config/db');
const jwt = require('jsonwebtoken');

const COLLECTION_NAME = 'user';

const generateToken = userId => new Promise((resolve) => {
  resolve(jwt.sign({
    id: userId,
    role: 'user',
  }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  }));
});

module.exports.authenticate = (req, res, next) => {
  try {
    const options = { clockTolerance: 60 };
    const decoded = jwt.verify(req.headers.authorization.replace(/^JWT\s/, ''), config.jwt.secret, options);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ code: 403, message: 'Not authenticated' });
  }
};

module.exports.login = (mail, password) => new Promise((resolve, reject) => {
  db.getConnection((connection, client) => {
    const collection = connection.collection('user');
    collection.findOne({ mail, password }, (err, user) => {
      if (err) {
        client.close();
        reject(err);
      }
      if (user == null) {
        client.close();
        reject(new Error('Bad mail or password.'));
      }
      generateToken(user._id.toString()).then((token) => {
        resolve(token);
        client.close();
      }, (error) => {
        client.close();
        reject(error);
      });
    });
  });
});

module.exports.signup = (mail, password, name) => new Promise((resolve, reject) => {
  db.getConnection((connection, client) => {
    const collection = connection.collection(COLLECTION_NAME);
    collection.findOne({ mail }, (err, user) => {
      if (err) {
        client.close();
        reject(err);
      }

      if (user) {
        client.close();
        reject(new Error('User already exists.'));
      }

      const userObject = {
        name,
        mail,
        password,
        signUpDate: new Date(),
      };
      collection.insertOne(userObject, (insertError, insert) => {
        if (insertError) {
          client.close();
          reject(insertError);
        }

        generateToken(insert.insertedId).then((token) => {
          resolve(token);
          client.close();
        }, (error) => {
          client.close();
          reject(error);
        });
      });
    });
  });
});
