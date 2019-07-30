//for if the user closes the site and the react state is lost

var connection = require('./../sqlconnection/connectsql');
const express = require('express');
var app = express();
var router = express.Router();
var auth = require('./../../checktoken');

router.use(auth);

router.get('/', (req, res) => {
    
    res.send({
        'code':'0',
        'result':'data successfully retrieved',
        'body':req.body
    });

});

module.exports = router;