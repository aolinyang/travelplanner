var connection = require('./../sqlconnection/connectsql');
const express = require('express');
var app = express();
var router = express.Router();
const timeout = require('./../../constants').timeout;
const secret = require('./../../constants').secret;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
      res.status(500);
    }
    else{
      //found email
      if(results.length > 0){
        const hashed = results[0].password;
        bcrypt.compare(password, hashed, function(err, hashres) { 
          //wrong password
          if(!hashres){
            res.status(200);
            res.send({
              "code":1,
              "result":"Wrong password"
            });
          }
          //correct password
          else{
            let userdata = {
              id: results[0].id,
              first_name: results[0].first_name,
              last_name: results[0].last_name,
              email: email
            };
            const token = jwt.sign(userdata, secret, {expiresIn: '10h'}); 
            
            //httpOnly: true because no reason for client to know token value
            //later on, test if secure: false is needed
            res.status(200).cookie('token', token, { httpOnly: true, maxAge: timeout, secure: false}).send({
             "code":0,
             "result":"login sucessful",
             "userdata": userdata
            });
          }
        });
      }
      //could not find email
      else{
        res.send({
          "code":-1,
          "result":"Email does not exist"
        });
      }
    }
    });
  });

module.exports = router;