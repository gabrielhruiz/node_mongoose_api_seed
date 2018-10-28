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
    return res.status(400).json('Missing required parameters.');
  }

  return newsService.getNew(newId)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json(error));
});

router.get('/new', (req, res) => {
  const filter = {
    author: req.query.author || null,
    title: req.query.title || null,
    publishedAt: req.query.publishedAt || null,
    keyword: req.query.keyword || null,
  };

  newsService.getNews(filter)
    .then((newa) => res.status(200).json(newa))
    .catch((error) => res.status(500).json(error));
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

  if (!newObj.title || !newObj.author || !newObj.publishedAt ||
    !newObj.url || !newObj.sourceId || !newObj.sourceName) {
    return res.status(400).json('Missing required parameters.');
  }

  return newsService.createNew(newObj)
    .then((newObj) => res.status(200).json(newObj))
    .catch((error) => res.status(500).json(error));
});

router.put('/new/:id', authenticate.authenticate, (req, res) => {
  const id = req.params.id || null;
  const newObj = {
    author: req.query.author || null,
    title: req.query.title || null,
    publishedAt: req.query.publishedAt || null,
    keyword: req.query.keyword || null,
    url: req.query.url || null,
    sourceId: req.query.sourceId || null,
    sourceName: req.query.sourceName || null,
  };

  if (!Object.keys(newObj).length || !id) {
    return res.status(400).json('Missing required parameters.');
  }

  return newsService.updateNew(newObj)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
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

  if (filter.id == null) {
    return res.status(400).json('Missing required parameters.');
  }

  return newsService.updateNewFields(filter)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

router.delete('/new/:id', authenticate.authenticate, (req, res) => {
  const newId = req.params.id || null;

  if (newId == null) {
    return res.status(400).json('Missing required parameters.');
  }

  return newsService.deleteNew(newId)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
