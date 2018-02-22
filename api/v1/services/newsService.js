/*
* Author: gabrielhruiz
* */
let ObjectId = require('mongodb').ObjectID;
let db = require('./../../../config/db');

module.exports.getNew = function (id) {
    return new Promise((resolve, reject) => {

        db.getConnection(function(connection, client) {
            let collection = connection.collection('news');
            collection.find({"_id": new ObjectId(id)}).toArray(function(err, docs) {
                if (err) {
                    client.close();
                    return reject(err);
                }
                resolve(docs);
                client.close();
            });
        });

    });
};

module.exports.getNews = function (author, title, publishedAt, keyword) {
    return new Promise((resolve, reject) => {

        let searchObject = {};

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

        db.getConnection(function(connection, client) {
            const collection = connection.collection('news');
            collection.find(searchObject).toArray(function(err, docs) {
                if (err) {
                    client.close();
                    return reject(err);
                }
                resolve(docs);
                client.close();
            });
        });

    });
};

module.exports.createNew = function (title, author, publishedAt, url, sourceId, sourceName) {
    return new Promise((resolve, reject) => {

        db.getConnection(function(connection, client) {
            let collection = connection.collection('news');
            collection.insertMany([
                {
                    "title": title,
                    "author": author,
                    "publishedAt": publishedAt,
                    "url": url,
                    "source": {
                        "id": sourceId,
                        "name": sourceName
                    }
                }
            ], function(err, result) {
                if (err) {
                    client.close();
                    return reject(err);
                }
                resolve(result);
                client.close();
            });
        });

    });
};

module.exports.updateNew = function (title, author, publishedAt, url, sourceId, sourceName) {
    return new Promise((resolve, reject) => {

        db.getConnection(function(connection, client) {
            let collection = connection.collection('news');
            collection.updateOne({ author : author, title: title, publishedAt: publishedAt },
                { $set: {
                        "title": title,
                        "author": author,
                        "publishedAt": publishedAt,
                        "url": url,
                        "source": {
                            "id": sourceId,
                            "name": sourceName
                        }
                    } }, function(err, result) {
                    if (err) {
                        client.close();
                        return reject(err);
                    }
                    resolve(result);
                    client.close();
                });
        });

    });
};

module.exports.updateNewFields = function (title, author, publishedAt, url, sourceId, sourceName, id) {
    return new Promise((resolve, reject) => {

        let newObject = {};
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

        db.getConnection(function(connection, client) {
            let collection = connection.collection('news');
            collection.updateOne({_id : new ObjectId(id)},
                { $set: newObject }, function(err, result) {
                    if (err) {
                        client.close();
                        return reject(err);
                    }
                    resolve(result);
                    client.close();
                });
        });

    });
};

module.exports.deleteNew = function (id) {
    return new Promise((resolve, reject) => {

        db.getConnection(function(connection, client) {
            let collection = connection.collection('news');
            collection.deleteOne({_id : new ObjectId(id)}, function(err, result) {
                if (err) {
                    client.close();
                    return reject(err);
                }
                resolve(result);
                client.close();
            });
        });

    });
};