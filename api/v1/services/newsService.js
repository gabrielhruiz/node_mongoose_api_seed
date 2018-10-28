/*
* Author: gabrielhruiz
* */
const ObjectId = require('mongodb').ObjectID;
const db = require('./../../../config/connections/mongodb');
const { COLLECTIONS } = require('./../enums/database');

module.exports.getNew = (id) => {
  const newsCollection = db.get().collection(COLLECTIONS.NEWS);
  const query = { _id: new ObjectId(id) };
  return newsCollection.findOne(query);
};

module.exports.getNews = filter => {
  const searchObject = {};

  if (filter.author != null) {
    searchObject.author = filter.author;
  }
  if (filter.title != null) {
    searchObject.title = filter.title;
  }
  if (filter.publishedAt != null) {
    searchObject.publishedAt = filter.publishedAt;
  }
  if (filter.keyword != null) {
    searchObject.keyword = filter.keyword;
  }

  const newsCollection = db.get().collection(COLLECTIONS.NEWS);
  return newsCollection.find(searchObject).toArray();
};

module.exports.createNew = newObj => {
  const newsCollection = db.get().collection(COLLECTIONS.NEWS);
  return newsCollection.insertOne(newObj);
};

module.exports.updateNew = (id, newObj) => {
  const newsCollection = db.get().collection(COLLECTIONS.NEWS);
  return newsCollection.update({ _id: new Object(id) }, { $set: newObj });
};

module.exports.updateNewFields = filter => {
  const newObject = {};
  if (filter.title != null) {
    newObject.title = filter.title;
  }
  if (filter.author != null) {
    newObject.author = filter.author;
  }
  if (filter.publishedAt != null) {
    newObject.publishedAt = filter.publishedAt;
  }
  if (filter.url != null) {
    newObject.url = filter.url;
  }
  if (filter.sourceId != null) {
    newObject.source.Id = filter.sourceId;
  }
  if (filter.sourceName != null) {
    newObject.source.name = filter.sourceName;
  }

  const newsCollection = db.get().collection(COLLECTIONS.NEWS);
  return newsCollection.update({ _id: new Object(filter.id) }, { $set: newObject });
};

module.exports.deleteNew = id => {
  const newsCollection = db.get().collection(COLLECTIONS.NEWS);
  return newsCollection.remove({ _id: new Object(id) });
};
