const jwt = require('jsonwebtoken');

const { userService } = require('../services');

const authProcess = require('../processes/authentication');
const userProcess = require('../processes/user');

const Error = require('../Error');

const JWT_SECRET = process.env.JWT_SECRET;

exports.jwtAuthenticate = async (req, res, next) => {
  try {
    const options = { clockTolerance: 60 };
    const decoded = jwt.verify(req.headers.authorization.replace(/^Bearer\s/, ''),
      JWT_SECRET, options);
    const { userId, role } = decoded;

    if (!userId || !role) {
      const error = Error.generateError(401, 'Invalid access token');
      return Error.manageError(error, req, res);
    }

    const user = await userService.getDocument({ _id: userId });
    req.payload = { user, role };

    return next();
  } catch (err) {
    const error = Error.generateError(401, 'Not authenticate');
    return Error.manageError(error, req, res);
  }
};

exports.signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      const error = Error.generateError(400, 'Missing required parameters', req.body);
      return Error.manageError(error, req, res);
    }

    const credentials = await authProcess.signUp(email, password, name);
    return res.status(200).json(credentials);
  } catch (error) {
    return Error.manageError(error, req, res);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = Error.generateError(400, 'Missing required parameters', req.body);
      return Error.manageError(error, req, res);
    }

    const user = await authProcess.login(email, password);
    const credentials = user.toObject();
    credentials.access_token = userProcess.generateAccessToken(credentials._id);

    return res.status(200).json(credentials);
  } catch (error) {
    return Error.manageError(error, req, res);
  }
};
