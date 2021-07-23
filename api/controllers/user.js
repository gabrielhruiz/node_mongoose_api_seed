/*
* Author: gabrielhruiz
* */
const express = require('express');

const {
  getUserList,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../middlewares/user');
const {
  onlyAdminAllowed
} = require('../middlewares/authentication');

const router = express.Router();

router.get('/user', getUserList);
router.get('/user/:id', getUserById);
router.post('/user', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', onlyAdminAllowed, deleteUser);

module.exports = router;
