const jwt = require('jsonwebtoken');

const Error = require('../error');

module.exports.authenticate = (req, res, next) => {
  try {
    const options = { clockTolerance: 60 };
    const decoded = jwt.verify(req.headers.authorization.replace(/^Bearer\s/, ''),
      config.jwt.secret, options);
    const { userId, role } = decoded;
    if (!userId || !role) {
      const error = Error.generateError(403, 'Invalid access token');
      return res.status(error.status).json(error);
    }
    req.payload = { userId, role };
    return next();
  } catch (err) {
    const error = Error.generateError(403, 'Not authenticate');
    return res.status(error.status).json(error);
  }
};