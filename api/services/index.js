const User = require('../models/user');

const Service = require('./Service');

module.exports = {
  userService: new Service(User)
};
