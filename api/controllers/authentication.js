/*
* Author: gabrielhruiz
* */
const express = require('express');

const authMidddleware = require('../middlewares/authentication');

const router = express.Router();

router.post('/signUp', authMidddleware.signUp);
router.post('/login', authMidddleware.login);

module.exports = router;
