/*
* Author: gabrielhruiz
* */
const userService = require('./user');

const Error = require('./../error');

module.exports.login = (email, password) => new Promise((resolve, reject) => {
  return userService.getUser({ conditions: { 'profile.email': email } })
    .then((user) => {
      if (!user) {
        const error = Error.generateError(401, 'Bad email', { id: 'BAD_EMAIL' });
        return reject(error);
      }
      const { profile } = user;
      if (password !== profile.password) {
        const error = Error.generateError(401, 'Bad password', { id: 'BAD_PASSWORD' });
        return reject(error);
      }
      return resolve(user);
    })
    .catch((error) => reject(error));
});

module.exports.signup = (email, password, name) => {
  const user = {
    profile: { email, password, name }
  };
  return userService.createUser(user);
};
