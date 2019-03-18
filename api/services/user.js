const jwt = require('jsonwebtoken');

const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

const generateAccessToken = userId => {
  const payload = { userId, role: 'USER' };
  const options = { expiresIn: JWT_EXPIRES };
  try {
    return jwt.sign(payload, JWT_SECRET, options);
  } catch (jwtErr) {
    throw new Error(jwtErr.toString());
  }
};

const generateRefreshToken = userId => {
  const payload = { userId };
  try {
    return jwt.sign(payload, JWT_SECRET);
  } catch (jwtErr) {
    throw new Error(jwtErr.toString());
  }
};

exports.getUser = (query = {}) => {
  const { conditions = {}, populates = [], options = {}, sorter = {} } = query;
  const result = User.findOne(conditions, options).sort(sorter);
  return populates.reduce((acc, populate) => acc.populate(populate), result);
};

const updateUser = (query = {}) => {
  const { condition = {}, update = {}, populates = [], options = {} } = query;
  const result = User.findOneAndUpdate(condition, update, options);
  return populates.reduce((acc, populate) => acc.populate(populate), result);
};

exports.createUser = (userData) => new Promise((resolve, reject) => {
  const { profile } = userData;
  const newUser = new User({ profile, role: 'USER' });
  return newUser.save()
    .then((user) => {
      const access_token = generateAccessToken(user._id);
      const refresh_token = generateRefreshToken(user._id);
      const update = { access_token, refresh_token };
      return updateUser({
        condition: { _id: user._id },
        update,
        options: { new: true }
      });
    })
    .then((user) => resolve(user))
    .catch((error) => reject(error));
});