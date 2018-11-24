/*
* Author: gabrielhruiz
* */

const authService = require('./../services/authService');
const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  const email = req.body.email || null;
  const password = req.body.password || null;

  if (email == null || password == null) {
    return res.status(400).json('Missing required parameters.');
  }

  return authService.login(email, password)
    .then((login) => res.status(200).json(login))
    .catch((error) => res.status(500).json(error));
});

router.post('/signup', (req, res) => {
  const mail = req.body.mail || null;
  const password = req.body.password || null;
  const name = req.body.name || null;

  if (mail == null || password == null) {
    res.status(400).json('Missing required parameters.');
  } else {
    authService.signup(mail, password, name).then((response) => {
      res.status(200).json(response);
    }, (error) => {
      res.status(500).json(error);
    });
  }
});

module.exports = router;
