const User = require('../models/User');

const Service = require('./Service');

module.exports = {
  userService: new Service(User)
};
