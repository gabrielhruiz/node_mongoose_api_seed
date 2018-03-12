/*
* Author: gabrielhruiz
* */
const express = require('express');
const newsService = require('./../services/newsService');
const authenticate = require('./../services/authService');

const router = express.Router();

router.get('/new/:id', (req, res) => {
  const newId = req.params.id || null;

  if (newId == null) {
    res.status(400).json('Missing required parameters.');
  } else {
    newsService.getNew(newId).then((response) => {
      res.status(200).json(response);
    }, (error) => {
      res.status(500).json(error);
    });
  }
});

router.get('/new', (req, res) => {
  const author = req.query.author || null;
  const title = req.query.title || null;
  const publishedAt = req.query.publishedAt || null;
  const keyword = req.query.keyword || null;

  newsService.getNews(author, title, publishedAt, keyword).then((response) => {
    res.status(200).json(response);
  }, (error) => {
    res.status(500).json(error);
  });
});

router.post('/new', authenticate.authenticate, (req, res) => {
  const title = req.body.title || null;
  const author = req.body.author || null;
  const publishedAt = req.body.publishedAt || null;
  const url = req.body.url || null;
  const sourceId = req.body.sourceId || null;
  const sourceName = req.body.sourceName || null;

  if (title == null || author == null || publishedAt == null ||
      url == null || sourceId == null || sourceName == null) {
    res.status(400).json('Missing required parameters.');
  } else {
    newsService.createNew(title, author, publishedAt, url, sourceId, sourceName)
      .then((response) => {
        res.status(200).json(response);
      }, (error) => {
        res.status(500).json(error);
      });
  }
});

router.put('/new', authenticate.authenticate, (req, res) => {
  const title = req.body.title || null;
  const author = req.body.author || null;
  const publishedAt = req.body.publishedAt || null;
  const url = req.body.url || null;
  const sourceId = req.body.sourceId || null;
  const sourceName = req.body.sourceName || null;

  if (title == null || author == null || publishedAt == null) {
    res.status(400).json('Missing required parameters.');
  } else {
    newsService.updateNew(title, author, publishedAt, url, sourceId, sourceName)
      .then((response) => {
        res.status(200).json(response);
      }, (error) => {
        res.status(500).json(error);
      });
  }
});

router.patch('/new/:id', authenticate.authenticate, (req, res) => {
  const newId = req.params.id || null;
  const title = req.body.title || null;
  const author = req.body.author || null;
  const publishedAt = req.body.publishedAt || null;
  const url = req.body.url || null;
  const sourceId = req.body.sourceId || null;
  const sourceName = req.body.sourceName || null;

  if (newId == null) {
    res.status(400).json('Missing required parameters.');
  } else {
    newsService.updateNewFields(title, author, publishedAt, url, sourceId, sourceName, newId)
      .then((response) => {
        res.status(200).json(response);
      }, (error) => {
        res.status(500).json(error);
      });
  }
});

router.delete('/new/:id', authenticate.authenticate, (req, res) => {
  const newId = req.params.id || null;

  if (newId == null) {
    res.status(400).json('Missing required parameters.');
  } else {
    newsService.deleteNew(newId).then((response) => {
      res.status(200).json(response);
    }, (error) => {
      res.status(500).json(error);
    });
  }
});

module.exports = router;
