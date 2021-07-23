const jwt = require('jsonwebtoken');

const { userService } = require('../services');

const { ROLES } = require('../enums/user');
const { JWT_SECRET, JWT_EXPIRATION } = require('../../config/environment');

const generateAccessToken = (userId, role = ROLES.USER) => {
  const payload = { userId, role };
  const options = { expiresIn: JWT_EXPIRATION };
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

const createUser = userData => new Promise((resolve, reject) => {
  const { profile } = userData;
  return userService.createDocument({ profile, role: ROLES.USER })
    .then((user) => {
      const refresh_token = generateRefreshToken(user._id);
      const update = { refresh_token };
      return userService.updateDocument({
        condition: { _id: user._id },
        update,
        options: { new: true }
      });
    })
    .then(user => resolve(user))
    .catch(error => reject(error));
});

exports.createUser = createUser;
exports.generateAccessToken = generateAccessToken;
