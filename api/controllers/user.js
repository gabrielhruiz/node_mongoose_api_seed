/*
* Author: gabrielhruiz
* */
const express = require('express');

const userMiddleware = require('../middlewares/user');

const router = express.Router();

router.get('/user', userMiddleware.getUserList);
router.get('/user/:id', userMiddleware.getUserById);
router.post('/user', userMiddleware.createUser);
router.put('/user/:id', userMiddleware.updateUser);
router.delete('/user/:id', userMiddleware.deleteUser);

module.exports = router;
