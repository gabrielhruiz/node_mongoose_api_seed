/*
* Author: gabrielhruiz
* */
const { userService } = require('../services');

const userProcess = require('./user');

const Error = require('../Error');

const login = async (email, password) => {
  const userQuery = { conditions: { 'profile.email': email } };
  const user = await userService.getDocument(userQuery);
  if (!user) {
    throw Error.generateError(401, 'Bad email', { id: 'BAD_EMAIL' });
  }

  const { profile } = user;
  if (password !== profile.password) {
    throw Error.generateError(401, 'Bad password', { id: 'BAD_PASSWORD' });
  }

  return user;
};

const signUp = (email, password, name) => {
  const user = {
    profile: { email, password, name }
  };
  return userProcess.createUser(user);
};

module.exports = { login, signUp };
