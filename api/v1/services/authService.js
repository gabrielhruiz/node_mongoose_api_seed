/*
* Author: gabrielhruiz
* */
let config = require('./../../../config');
let db = require('./../../../config/db');
let jwt = require('jsonwebtoken');

module.exports.login = function (mail, password) {
    return new Promise((resolve, reject) => {

        db.getConnection(function(connection, client) {
            let collection = connection.collection('user');
            collection.findOne({mail: mail, password: password}, function(err, user) {
                if (err) {
                    client.close();
                    return reject(err);
                }
                if (user == null) {
                    client.close();
                    return reject("Bad mail or password.");
                }
                generateToken(user._id.toString()).then(token => {
                    resolve(token);
                    client.close();
                }, error => {
                    client.close();
                    return reject(error);
                });
            });
        });

    });
};

module.exports.signup = function (mail, password, name) {
    return new Promise((resolve, reject) => {

        db.getConnection(function(connection, client) {
            let collection = connection.collection('user');
            collection.find({mail: mail}).toArray(function(err, users) {
                if (err) {
                    client.close();
                    return reject(err);
                }
                if (users.length == 0) {
                    let userObject = {
                        name: name,
                        mail: mail,
                        password: password,
                        signUpDate: new Date()
                    };
                    collection.insertOne(userObject, function(err, insert) {
                        if (err) {
                            client.close();
                            return reject(err);
                        }
                        generateToken(insert.insertedId).then(token => {
                            resolve(token);
                            client.close();
                        }, error => {
                            client.close();
                            return reject(error);
                        });
                    });
                } else {
                    client.close();
                    return reject("User already exists.");
                }
            });
        });

    });
};

let generateToken = function(userId) {
    return new Promise((resolve, reject) => {
        resolve(jwt.sign({
            id: userId,
            role: "user"
        }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn
        }));
    });
};

module.exports.authenticate = function (req, res, next) {
    try {
        let options = {clockTolerance: 60};
        let decoded = jwt.verify(req.headers['authorization'].replace(/^JWT\s/, ''), config.jwt.secret, options);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ code: 403, message: 'Not authenticated' });
    }
};