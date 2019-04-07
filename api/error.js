const logger = require('../config/logger');

const errors = {
  400: {
    status: 400,
    statusMessage: 'Bad Request',
  },
  401: {
    status: 401,
    statusMessage: 'Unauthorized',
  },
  403: {
    status: 403,
    statusMessage: 'Forbidden',
  },
  404: {
    status: 404,
    statusMessage: 'Not Found',
  },
  405: {
    status: 405,
    statusMessage: 'Method Not Allowed',
  },
  500: {
    status: 500,
    statusMessage: 'Internal Server Error',
  },
  501: {
    status: 501,
    statusMessage: 'Not Implemented',
  }
};

exports = class Error {
  static generateError(status, message, data) {
    const error = errors[status];
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
  };
  static manageError(error, req, res) {
    logger.error(`${req.method} ${req.originalUrl}: ${JSON.stringify(error)}`);
    return res.status(error.status || 500).json(error);
  };
};
