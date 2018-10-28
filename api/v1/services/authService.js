/*
* Author: gabrielhruiz
* */
const config = require('./../../../config');
const db = require('./../../../config/connections/mongodb');
const jwt = require('jsonwebtoken');

const { COLLECTIONS } = require('../enums/database');

const generateToken = userId => jwt.sign({
  id: userId,
  role: 'user',
}, config.jwt.secret, {
  expiresIn: config.jwt.expiresIn,
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
  const newsCollection = db.get().collection(COLLECTIONS.USER);
  newsCollection.findOne({ mail, password })
    .thne((user) => {
      if (!user) {
        return reject(new Error('Bad mail or password.'));
      }

      return resolve(generateToken(user._id.toString()));
    })
    .catch((findErr) => reject(findErr));
});

module.exports.signup = (mail, password, name) => new Promise((resolve, reject) => {
  const newsCollection = db.get().collection(COLLECTIONS.USER);
  newsCollection.findOne({ mail })
    .thne((user) => {
      if (user) {
        return reject(new Error('User already exists.'));
      }

      const userObject = {
        name,
        mail,
        password,
        signUpDate: new Date(),
      };
      return newsCollection.insertOne(userObject)
        .then((insertedUser) => resolve(generateToken(insertedUser._id.toString())))
        .catch((insertErr) => reject(insertErr));
    })
    .catch((findErr) => reject(findErr));
});
