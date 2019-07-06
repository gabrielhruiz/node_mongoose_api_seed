module.exports = class Service {
  constructor(Model) {
    this.Model = Model;
  }
  getDocument(query = {}) {
    const { conditions = {}, populates = [], options = {} } = query;
    const result = this.Model.findOne(conditions, options);
    return populates.reduce((acc, populate) => acc.populate(populate), result);
  }
  getDocumentList(query = {}) {
    const { conditions = {}, populates = [], options = {}, sorter = {} } = query;
    const result = this.Model.find(conditions, options).sort(sorter);
    return populates.reduce((acc, populate) => acc.populate(populate), result);
  }
  createDocument(data) {
    return new this.Model(data).save();
  }
  updateDocument(query = {}) {
    const { condition = {}, update = {}, populates = [], options = {} } = query;
    const result = this.Model.findOneAndUpdate(condition, update, options);
    return populates.reduce((acc, populate) => acc.populate(populate), result);
  }
  deleteDocument(query = {}) {
    const { conditions, options } = query;
    return this.Model.findOneAndRemove(conditions, options);
  }
}
