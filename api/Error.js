const logger = require('../config/logger');

const { ERRORS } = require('./enums/error');

module.exports = class Error {
  static generateError(status, message, data) {
    const error = ERRORS[status];
    if (!error) {
      throw new Error('"status" parameter is required.');
    }

    if (message) {
      error.message = message;
    }

    if (data && data instanceof Object) {
      error.data = data;
    }

    return error;
  }
  static manageError(error, req, res) {
    logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
    return res.status(error.status || 500).json(error);
  }
};
