/*
* Author: gabrielhruiz
* */
const { userService } = require('../services');

const userProcess = require('./user');

const Error = require('../Error');

const login = (email, password) => new Promise((resolve, reject) =>
  userService.getDocument({ conditions: { 'profile.email': email } })
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
    .catch(error => reject(error))
);

const signUp = (email, password, name) => {
  const user = {
    profile: { email, password, name }
  };
  return userProcess.createUser(user);
};

module.exports = { login, signUp };
