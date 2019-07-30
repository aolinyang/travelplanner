//correct example of an endpoint with auth

var connection = require('./../sqlconnection/connectsql');
const express = require('express');
var app = express();
var router = express.Router();
var auth = require('./../../checktoken');

router.use(auth);

router.get('/', (req, res) => {
    res.send({
        'code': 0,
        'result': 'Access granted',
        "success":"you passed the test!",
        "body":req.body
    });
    console.log("made it");
    console.log();
});

module.exports = router;