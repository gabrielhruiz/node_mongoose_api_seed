/*
* Author: gabrielhruiz
* */
const config = require('./../../../config/index');
const request = require('request');

module.exports.dummyCron = (coinName, page) => new Promise((resolve, reject) => {
  request({
    url: `https://newsapi.org/v2/everything?q=${coinName}
        &sortBy=publishedAt&page=${page}&apiKey=${config.newsApiKey}`,
    method: 'GET',
  }, (err, httpResponse, body) => {
    if (err) {
      return reject(err);
    }
    resolve(body);
  });
});
