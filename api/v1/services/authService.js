/*
* Author: gabrielhruiz
* */
const config = require('./../../../config');
const db = require('./../../../config/connections/mongodb');
const jwt = require('jsonwebtoken');

const { COLLECTIONS } = require('../enums/database');
const SECRET = config.jwt.secret;

const generateToken = userId => {
  const payload = { userId, role: 'user' };
  const options = { expiresIn: config.jwt.expiresIn };
  try {
    return jwt.sign(payload, SECRET, options);
  } catch (jwtErr) {
    throw new Error(jwtErr.toString());
  }
};

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
    .then((user) => {
      if (!user) {
        return reject(new Error('Bad mail or password.'));
      }

      const accessToken = generateToken(user._id.toString());
      return resolve({ accessToken });
    })
    .catch((findErr) => reject(findErr));
});

module.exports.signup = (mail, password, name) => new Promise((resolve, reject) => {
  const newsCollection = db.get().collection(COLLECTIONS.USER);
  newsCollection.findOne({ mail })
    .then((user) => {
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
