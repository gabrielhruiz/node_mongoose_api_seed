/*
* Author: gabrielhruiz
* */
const express = require('express');

const userService = require('../services/user');

const logger = require('../../config/logger');

const router = express.Router();

router.get('/user', (req, res) => {
  const conditions = req.query;
  if (conditions.name) {
    conditions['profile.name'] = conditions.name;
    delete conditions.name;
  }
  const query = { conditions };
  return userService.getUserList(query)
    .then((user) => res.status(200).json(user))
    .catch((error) => {
      logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
      return res.status(error.status || 500).json(error);
    });
});

router.get('/user/:id', (req, res) => {
  const id = req.params.id === 'me' ? req.payload.userId : req.params.id;
  const query = { conditions: { _id: id } };
  return userService.getUser(query)
    .then((user) => res.status(200).json(user))
    .catch((error) => {
      logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
      return res.status(error.status || 500).json(error);
    });
});

router.post('/user', (req, res) => {
  const userData = req.body;
  return userService.createUser(userData)
    .then((user) => res.status(200).json(user))
    .catch((error) => {
      logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
      return res.status(error.status || 500).json(error);
    });
});

router.put('/user/:id', (req, res) => {
  const userData = req.body;
  const id = req.params.id === 'me' ? req.payload.userId : req.params.id;
  const query = { conditions: { _id: id }, update: userData };
  return userService.updateUser(query)
    .then((user) => res.status(200).json(user))
    .catch((error) => {
      logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
      return res.status(error.status || 500).json(error);
    });
});

router.delete('/user/:id', (req, res) => {
  const id = req.params.id;
  const query = { conditions: { _id: id } };
  return userService.deleteUser(query)
    .then((user) => res.status(200).json(user))
    .catch((error) => {
      logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
      return res.status(error.status || 500).json(error);
    });
});

module.exports = router;
