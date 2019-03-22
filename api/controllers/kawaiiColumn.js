const express = require('express');

const userHelper = require('../middlewares/authentication');
const columnsService = require('../services/kawaiiColumn');

const logger = require('../../config/logger');

const router = express.Router();

router.get('/cols/:userId',userHelper.authenticate, (req, res) => {
    const query = { userId: req.params.userId };
    return columnsService.getColumnsOfUser(query)
        .then( columns => res.status(200).json(columns))
        .catch( error => {
            logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
            return res.status(error.status || 500).json(error);
        })
});

router.put('/cols/:userId', userHelper.authenticate, (req, res) => {
    const query = { userId: req.params.userId, position: req.body.position, kawaiisList: req.body.kawaiisList };
    return columnsService.updateColumnKawaiis(query)
        .then( updatedColumn => res.status(200).json(updatedColumn))
        .catch( error => {
            logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
            return res.status(error.status || 500).json(error);
        })
});

router.delete('/cols/:userId', userHelper.authenticate, (req, res) => {
    const query = { userId: req.params.userId };
    return columnsService.deleteColumnsOfUser(query)
        .then( columnsDeleted => res.status(200).json(columnsDeleted))
        .catch( error => {
            logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
            return res.status(error.status || 500).json(error);
        });
});

module.exports = router;