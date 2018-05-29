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
  const filter = {
    author: req.query.author || null,
    title: req.query.title || null,
    publishedAt: req.query.publishedAt || null,
    keyword: req.query.keyword || null,
  };

  newsService.getNews(filter).then((response) => {
    res.status(200).json(response);
  }, (error) => {
    res.status(500).json(error);
  });
});

router.post('/new', authenticate.authenticate, (req, res) => {
  const newObj = {
    author: req.query.author || null,
    title: req.query.title || null,
    publishedAt: req.query.publishedAt || null,
    keyword: req.query.keyword || null,
    url: req.query.url || null,
    sourceId: req.query.sourceId || null,
    sourceName: req.query.sourceName || null,
  };

  if (newObj.title == null || newObj.author == null || newObj.publishedAt == null ||
    newObj.url == null || newObj.sourceId == null || newObj.sourceName == null) {
    res.status(400).json('Missing required parameters.');
  } else {
    newsService.createNew(newObj)
      .then((response) => {
        res.status(200).json(response);
      }, (error) => {
        res.status(500).json(error);
      });
  }
});

router.put('/new', authenticate.authenticate, (req, res) => {
  const newObj = {
    author: req.query.author || null,
    title: req.query.title || null,
    publishedAt: req.query.publishedAt || null,
    keyword: req.query.keyword || null,
    url: req.query.url || null,
    sourceId: req.query.sourceId || null,
    sourceName: req.query.sourceName || null,
  };

  if (newObj.title == null || newObj.author == null || newObj.publishedAt == null) {
    res.status(400).json('Missing required parameters.');
  } else {
    newsService.updateNew(newObj)
      .then((response) => {
        res.status(200).json(response);
      }, (error) => {
        res.status(500).json(error);
      });
  }
});

router.patch('/new/:id', authenticate.authenticate, (req, res) => {
  const filter = {
    id: req.params.id || null,
    author: req.body.author || null,
    title: req.body.title || null,
    publishedAt: req.body.publishedAt || null,
    url: req.body.url || null,
    sourceId: req.body.sourceId || null,
    sourceName: req.body.sourceName || null,
  };

  if (filter.newId == null) {
    res.status(400).json('Missing required parameters.');
  } else {
    newsService.updateNewFields(filter)
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
