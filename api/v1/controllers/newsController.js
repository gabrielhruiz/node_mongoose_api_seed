/*
* Author: gabrielhruiz
* */
let express = require('express');
let router = express.Router();
let newsService = require('./../services/newsService');
let authenticate = require('./../services/authService').authenticate;

router.get('/new/:id', function (req, res) {

    let newId = req.params.id || null;

    if (newId == null) {

        res.status(400).json("Missing required parameters.");
    } else {
        newsService.getNew(newId).then(response => {
            res.status(200).json(response);
        }, error => {
            res.status(500).json(error);
        });
    }
});

router.get('/new', function (req, res) {

    let author = req.query.author || null;
    let title = req.query.title || null;
    let publishedAt = req.query.publishedAt || null;
    let keyword = req.query.keyword || null;

    newsService.getNews(author, title, publishedAt, keyword).then(response => {
        res.status(200).json(response);
    }, error => {
        res.status(500).json(error);
    });
});

router.post('/new', authenticate, function (req, res) {

    let title = req.body.title || null;
    let author = req.body.author || null;
    let publishedAt = req.body.publishedAt || null;
    let url = req.body.url || null;
    let sourceId = req.body.sourceId || null;
    let sourceName = req.body.sourceName || null;

    if (title == null || author == null || publishedAt == null ||
        url == null || sourceId == null || sourceName == null) {

        res.status(400).json("Missing required parameters.");
    } else {
        newsService.createNew(title, author, publishedAt, url, sourceId, sourceName).then(response => {
            res.status(200).json(response);
        }, error => {
            res.status(500).json(error);
        });
    }
});

router.put('/new', authenticate, function (req, res) {

    let title = req.body.title || null;
    let author = req.body.author || null;
    let publishedAt = req.body.publishedAt || null;
    let url = req.body.url || null;
    let sourceId = req.body.sourceId || null;
    let sourceName = req.body.sourceName || null;

    if (title == null || author == null || publishedAt == null) {

        res.status(400).json("Missing required parameters.");
    } else {
        newsService.updateNew(title, author, publishedAt, url, sourceId, sourceName).then(response => {
            res.status(200).json(response);
        }, error => {
            res.status(500).json(error);
        });
    }
});

router.patch('/new/:id', authenticate, function (req, res) {

    let newId = req.params.id || null;
    let title = req.body.title || null;
    let author = req.body.author || null;
    let publishedAt = req.body.publishedAt || null;
    let url = req.body.url || null;
    let sourceId = req.body.sourceId || null;
    let sourceName = req.body.sourceName || null;

    if (newId == null) {

        res.status(400).json("Missing required parameters.");
    } else {
        newsService.updateNewFields(title, author, publishedAt, url, sourceId, sourceName, newId).then(response => {
            res.status(200).json(response);
        }, error => {
            res.status(500).json(error);
        });
    }
});

router.delete('/new/:id', authenticate, function (req, res) {

    let newId = req.params.id || null;

    if (newId == null) {

        res.status(400).json("Missing required parameters.");
    } else {
        newsService.deleteNew(newId).then(response => {
            res.status(200).json(response);
        }, error => {
            res.status(500).json(error);
        });
    }
});

module.exports = router;