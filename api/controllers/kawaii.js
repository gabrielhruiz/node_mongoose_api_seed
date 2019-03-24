const express = require('express');

const userHelper = require('../middlewares/authentication');
const kawaiiService = require('../services/kawaii');

const logger = require('../../config/logger');

const router = express.Router();

router.get('/kawaii/:id', userHelper.authenticate, (req, res) => {
  const id = req.params.id === 'me' ? req.payload.userId : req.params.id;
  const query = { conditions: { userId: id } };
  return kawaiiService.getKawaii(query)
    .then(kawaii => res.status(200).json(kawaii))
    .catch((error) => {
      logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
      return res.status(error.status || 500).json(error);
    });
});

router.post('/kawaii', userHelper.authenticate, (req, res) => {
  const userData = req.body;
  return kawaiiService.createKawaii(userData)
    .then(kawaii => res.status(200).json(kawaii))
    .catch((error) => {
      logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
      return res.status(error.status || 500).json(error);
    });
});

router.put('/kawaii/:id', userHelper.authenticate, (req, res) => {
  const kawaiiData = req.body;
  const id = req.params.id === 'me' ? req.payload.userId : req.params.id;
  const query = { conditions: { userId: id }, update: kawaiiData };
  return kawaiiService.updateKawaii(query)
    .then(user => res.status(200).json(user))
    .catch((error) => {
      logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
      return res.status(error.status || 500).json(error);
    });
});

module.exports = router;
