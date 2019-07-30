var connection = require('./../sqlconnection/connectsql');
const express = require('express');
var app = express();
var router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie('token');
    res.send({
        'code':0,
        'result':'successfully logged out'
    });
});

module.exports = router;