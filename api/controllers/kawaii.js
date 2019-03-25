const express = require('express');

const kawaiisHelper = require('../middlewares/authentication');
const kawaiiService = require('../services/kawaii');

const logger = require('../../config/logger');

const router = express.Router();

router.get('/kawaii/:userId', kawaiisHelper.authenticate, (req, res) => {
    const query = { userId: req.params.userId };
    return kawaiiService.getKawaiiList(query)
    .then( kawaii => res.status(200).json(kawaii))
    .catch( error => {
        logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
        return res.status(error.status || 500).json(error);
    });
});

router.put('/kawaii/:userId', kawaiisHelper.authenticate, (req, res) => {
    const query = { userId: req.params.userId, position: req.body.position, kawaiiList: req.body.kawaiiList };
    return kawaiiService.updateKawaii(query)
    .then( updateKawaii => res.status(200).json(updateKawaii))
    .catch( error => {
        logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
        return res.status(error.status || 500).json(error);
    });
});

router.delete('/kawaii/:userId', kawaiisHelper.authenticate, (req, res) => {
    const query = { userId: req.params.userId };
    return kawaiiService.deleteKawaii(query)
    .then( deleteKawaii => res.status(200).json(deleteKawaii))
    .catch( error => {
        logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
        return res.status(error.status || 500).json(error);
    });
});

module.exports = router;
