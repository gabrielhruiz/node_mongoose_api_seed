const Kawaii = require('../models/Kawaii');

const getKawaii = (query = {}) => {
  const {
    conditions = {}, populates = [], options = {}, sorter = {}
  } = query;
  const result = Kawaii.findOne(conditions, options).sort(sorter);
  return populates.reduce((acc, populate) => acc.populate(populate), result);
};

const createKawaii = userData => new Promise((resolve, reject) => {
  const newKawaii = new Kawaii(userData);
  return newKawaii.save()
    .then(kawaii => resolve(kawaii))
    .catch(error => reject(error));
});

const updateKawaii = (query = {}) => {
  const {
    condition = {}, update = {}, populates = [], options = {}
  } = query;
  const result = Kawaii.findOneAndUpdate(condition, update, options);
  return populates.reduce((acc, populate) => acc.populate(populate), result);
};

exports.getKawaii = getKawaii;
exports.createKawaii = createKawaii;
exports.updateKawaii = updateKawaii;
