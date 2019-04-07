const jwt = require('jsonwebtoken');

const Error = require('../error');

const JWT_SECRET = process.env.JWT_SECRET;

exports.jwtAuthenticate = (req, res, next) => {
  try {
    const options = { clockTolerance: 60 };
    const decoded = jwt.verify(req.headers.authorization.replace(/^Bearer\s/, ''),
      JWT_SECRET, options);
    const { userId, role } = decoded;
    if (!userId || !role) {
      const error = Error.generateError(401, 'Invalid access token');
      return Error.manageError(error, req, res)
    }
    req.payload = { userId, role };
    return next();
  } catch (err) {
    const error = Error.generateError(401, 'Not authenticate');
    return Error.manageError(error, req, res)
  }
};
