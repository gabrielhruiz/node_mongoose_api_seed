/*
* Author: gabrielhruiz
* */
const express = require('express');

const authProcess = require('../processes/authentication');
const userProcess = require('../processes/user');

const Error = require('../Error');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = Error.generateError(400, 'Missing required parameters', req.body);
    return Error.manageError(error, req, res);
  }

  return authProcess.login(email, password)
    .then((user) => {
      const credentials = user.toObject();
      credentials.access_token = userProcess.generateAccessToken(credentials._id);
      return res.status(200).json(credentials);
    })
    .catch(error => Error.manageError(error, req, res));
});

router.post('/signUp', (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    const error = Error.generateError(400, 'Missing required parameters', req.body);
    return Error.manageError(error, req, res);
  }

  return authProcess.signUp(email, password, name)
    .then(credentials => res.status(200).json(credentials))
    .catch(error => Error.manageError(error, req, res));
});

module.exports = router;
