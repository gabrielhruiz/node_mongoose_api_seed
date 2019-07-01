/*
* Author: gabrielhruiz
* */
const express = require('express');

const { userService } = require('../services');
const userProcess = require('../processes/user');

const Error = require('../Error');

const router = express.Router();

router.get('/user', (req, res) => {
  const conditions = req.query;
  if (conditions.name) {
    conditions['profile.name'] = conditions.name;
    delete conditions.name;
  }
  const query = { conditions };
  return userService.getDocumentList(query)
    .then(user => res.status(200).json(user))
    .catch(error => Error.manageError(error, req, res));
});

router.get('/user/:id', (req, res) => {
  if (req.params.id === 'me') {
    return res.status(200).json(req.payload.user);
  }
  const id = req.params.id;
  const query = { conditions: { _id: id } };
  return userService.getDocument(query)
    .then(user => res.status(200).json(user))
    .catch(error => Error.manageError(error, req, res));
});

router.post('/user', (req, res) => {
  const userData = req.body;
  return userProcess.createUser(userData)
    .then(user => res.status(200).json(user))
    .catch(error => Error.manageError(error, req, res));
});

router.put('/user/:id', (req, res) => {
  const userData = req.body;
  const id = req.params.id === 'me' ? req.payload.user._id : req.params.id;
  const query = { conditions: { _id: id }, update: userData };
  return userService.updateDocument(query)
    .then(user => res.status(200).json(user))
    .catch(error => Error.manageError(error, req, res));
});

router.delete('/user/:id', (req, res) => {
  const id = req.params.id;
  const query = { conditions: { _id: id } };
  return userService.deleteDocument(query)
    .then(user => res.status(200).json(user))
    .catch(error => Error.manageError(error, req, res));
});

module.exports = router;
