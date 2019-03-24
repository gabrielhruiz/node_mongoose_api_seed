const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { JWT_SECRET } = process.env;
const { JWT_EXPIRES } = process.env;

const generateAccessToken = (userId) => {
  const payload = { userId, role: 'USER' };
  const options = { expiresIn: JWT_EXPIRES };
  try {
    return jwt.sign(payload, JWT_SECRET, options);
  } catch (jwtErr) {
    throw new Error(jwtErr.toString());
  }
};

const generateRefreshToken = (userId) => {
  const payload = { userId };
  try {
    return jwt.sign(payload, JWT_SECRET);
  } catch (jwtErr) {
    throw new Error(jwtErr.toString());
  }
};

const getUser = (query = {}) => {
  const {
    conditions = {}, populates = [], options = {}, sorter = {}
  } = query;
  const result = User.findOne(conditions, options).sort(sorter);
  return populates.reduce((acc, populate) => acc.populate(populate), result);
};

const getUserList = (query = {}) => {
  const {
    conditions = {}, populates = [], options = {}, sorter = {}
  } = query;
  const result = User.find(conditions, options).sort(sorter);
  return populates.reduce((acc, populate) => acc.populate(populate), result);
};

const updateUser = (query = {}) => {
  const {
    condition = {}, update = {}, populates = [], options = {}
  } = query;
  const result = User.findOneAndUpdate(condition, update, options);
  return populates.reduce((acc, populate) => acc.populate(populate), result);
};

const createUser = userData => new Promise((resolve, reject) => {
  const { profile } = userData;
  const newUser = new User({ profile, role: 'USER' });
  return newUser.save()
    .then((user) => {
      const refresh_token = generateRefreshToken(user._id);
      const update = { refresh_token };
      return updateUser({
        condition: { _id: user._id },
        update,
        options: { new: true }
      });
    })
    .then(user => resolve(user))
    .catch(error => reject(error));
});

const deleteUser = (query) => {
  const { conditions, options } = query;
  return User.findOneAndRemove(conditions, options);
};

exports.getUser = getUser;
exports.getUserList = getUserList;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.generateAccessToken = generateAccessToken;
