const { userService } = require('../services');
const userProcess = require('../processes/user');

const Error = require('../Error');

exports.getUserList = async (req, res) => {
  try {
    const conditions = req.query;
    if (conditions.name) {
      conditions['profile.name'] = conditions.name;
      delete conditions.name;
    }

    const query = { conditions };
    const user = await userService.getDocumentList(query);

    return res.status(200).json(user);
  } catch (error) {
    return Error.manageError(error, req, res);
  }
};

exports.getUserById = async (req, res) => {
  try {
    if (req.params.id === 'me') {
      return res.status(200).json(req.payload.user);
    }

    const id = req.params.id;
    const query = { conditions: { _id: id } };
    const user = await userService.getDocument(query);

    return res.status(200).json(user);
  } catch (error) {
    return Error.manageError(error, req, res);
  }
};

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userProcess.createUser(userData);

    return res.status(200).json(user);
  } catch (error) {
    return Error.manageError(error, req, res);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userData = req.body;
    const id = req.params.id === 'me' ? req.payload.user._id : req.params.id;
    const query = { conditions: { _id: id }, update: userData };
    const user = await userService.updateDocument(query);

    return res.status(200).json(user);
  } catch (error) {
    return Error.manageError(error, req, res);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { conditions: { _id: id } };
    const user = await userService.deleteDocument(query);

    return res.status(200).json(user);
  } catch (error) {
    return Error.manageError(error, req, res);
  }
};
