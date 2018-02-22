/*
* Author: gabrielhruiz
* */
let express = require('express');
let router = express.Router();
let authService = require('./../services/authService');

router.post('/login', function (req, res) {

    let mail = req.body.mail || null;
    let password = req.body.password || null;

    if (mail == null || password == null) {

        res.status(400).json("Missing required parameters.");
    } else {
        authService.login(mail, password).then(response => {
            res.status(200).json(response);
        }, error => {
            res.status(500).json(error);
        });
    }
});

router.post('/signup', function (req, res) {

    let mail = req.body.mail || null;
    let password = req.body.password || null;
    let name = req.body.name || null;

    if (mail == null || password == null) {

        res.status(400).json("Missing required parameters.");
    } else {
        authService.signup(mail, password, name).then(response => {
            res.status(200).json(response);
        }, error => {
            res.status(500).json(error);
        });
    }
});

module.exports = router;