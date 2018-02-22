/*
* Author: gabrielhruiz
* */
let config = require('./../../../config/index');
let request = require('request');

module.exports.dummyCron = function (coinName, page) {
    return new Promise((resolve, reject) => {
        request({
            url: "https://newsapi.org/v2/everything?q=" + coinName + "&sortBy=publishedAt&page="
                + page + "&apiKey=" + config.newsApiKey,
            method: 'GET',
        }, function (err, httpResponse, body) {
            if (err) {
                return reject({
                    code: 500,
                    message: err
                });
            } else {
                resolve(body);
            }
        });
    });
};