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

module.exports.getNews = (author, title, publishedAt, keyword) => new Promise((resolve, reject) => {
  const searchObject = {};

  if (author != null) {
    searchObject.author = author;
  }
  if (title != null) {
    searchObject.title = title;
  }
  if (publishedAt != null) {
    searchObject.publishedAt = publishedAt;
  }
  if (keyword != null) {
    searchObject.keyword = keyword;
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

module.exports.createNew = (title, author, publishedAt, url, sourceId, sourceName) => new Promise((resolve, reject) => {
  db.getConnection((connection, client) => {
    const collection = connection.collection('news');
    collection.insertMany([
      {
        title,
        author,
        publishedAt,
        url,
        source: {
          id: sourceId,
          name: sourceName,
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

module.exports.updateNew = (title, author, publishedAt, url, sourceId, sourceName) => new Promise((resolve, reject) => {
  db.getConnection((connection, client) => {
    const collection = connection.collection('news');
    collection.updateOne(
      { author, title, publishedAt },
      {
        $set: {
          title,
          author,
          publishedAt,
          url,
          source: {
            id: sourceId,
            name: sourceName,
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

module.exports.updateNewFields = (title,  author, publishedAt, url, sourceId, sourceName, id) => new Promise((resolve, reject) => {
  const newObject = {};
  if (title != null) {
    newObject.title = title;
  }
  if (author != null) {
    newObject.author = author;
  }
  if (publishedAt != null) {
    newObject.publishedAt = publishedAt;
  }
  if (url != null) {
    newObject.url = url;
  }
  if (sourceId != null) {
    newObject.source.Id = sourceId;
  }
  if (sourceName != null) {
    newObject.source.name = sourceName;
  }

  db.getConnection((connection, client) => {
    const collection = connection.collection('news');
    collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: newObject }, (err, result) => {
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
