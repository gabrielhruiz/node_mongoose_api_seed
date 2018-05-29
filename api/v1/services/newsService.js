/*
* Author: gabrielhruiz
* */
const ObjectId = require('mongodb').ObjectID;
const db = require('./../../../config/db');

module.exports.getNew = id => new Promise((resolve, reject) => {
  db.getConnection((connection, client) => {
    const collection = connection.collection('news');
    collection.find({ _id: new ObjectId(id) }).toArray((err, docs) => {
      if (err) {
        client.close();
        reject(err);
      }
      resolve(docs);
      client.close();
    });
  });
});

module.exports.getNews = filter => new Promise((resolve, reject) => {
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

  db.getConnection((connection, client) => {
    const collection = connection.collection('news');
    collection.find(searchObject).toArray((err, docs) => {
      if (err) {
        client.close();
        reject(err);
      }
      resolve(docs);
      client.close();
    });
  });
});

module.exports.createNew = newObj => new Promise((resolve, reject) => {
  db.getConnection((connection, client) => {
    const collection = connection.collection('news');
    collection.insertMany([
      {
        title: newObj.title,
        author: newObj.author,
        publishedAt: newObj.publishedAt,
        url: newObj.url,
        source: {
          id: newObj.sourceId,
          name: newObj.sourceName,
        },
      },
    ], (err, result) => {
      if (err) {
        client.close();
        reject(err);
      }
      resolve(result);
      client.close();
    });
  });
});

module.exports.updateNew = newObj => new Promise((resolve, reject) => {
  db.getConnection((connection, client) => {
    const collection = connection.collection('news');
    collection.updateOne(
      { author: newObj.author, title: newObj.title, publishedAt: newObj.publishedAt },
      {
        $set: {
          title: newObj.title,
          author: newObj.author,
          publishedAt: newObj.publishedAt,
          url: newObj.url,
          source: {
            id: newObj.sourceId,
            name: newObj.sourceName,
          },
        },
      }, (err, result) => {
        if (err) {
          client.close();
          reject(err);
        }
        resolve(result);
        client.close();
      }
    );
  });
});

module.exports.updateNewFields = filter => new Promise((resolve, reject) => {
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

  db.getConnection((connection, client) => {
    const collection = connection.collection('news');
    collection.updateOne(
      { _id: new ObjectId(filter.id) },
      { $set: newObject }, (err, result) => {
        if (err) {
          client.close();
          reject(err);
        }
        resolve(result);
        client.close();
      },
    );
  });
});

module.exports.deleteNew = id => new Promise((resolve, reject) => {
  db.getConnection((connection, client) => {
    const collection = connection.collection('news');
    collection.deleteOne({ _id: new ObjectId(id) }, (err, result) => {
      if (err) {
        client.close();
        reject(err);
      }
      resolve(result);
      client.close();
    });
  });
});
