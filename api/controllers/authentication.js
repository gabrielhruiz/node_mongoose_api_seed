/*
* Author: gabrielhruiz
* */
const express = require('express');

const authService = require('../services/authentication');
const userService = require('../services/user');

const logger = require('../../config/logger');
const Error = require('../error');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = Error.generateError(400, 'Missing required parameters', req.body);
    return res.status(error.status).json(error);
  }

  return authService.login(email, password)
    .then((user) => {
      const credentials = user.toObject();
      credentials.access_token = userService.generateAccessToken(credentials._id);
      return res.status(200).json(credentials);
    })
    .catch((error) => {
      logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
      return res.status(error.status || 500).json(error);
    });
});

router.post('/signup', (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    const error = Error.generateError(400, 'Missing required parameters', req.body);
    return res.status(error.status).json(error);
  }

  return authService.signup(email, password, name)
    .then(credentials => res.status(200).json(credentials))
    .catch((error) => {
      logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
      return res.status(error.status || 500).json(error);
    });
});

module.exports = router;
