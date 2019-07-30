var connection = require('./../sqlconnection/connectsql');
const bcrypt = require('bcrypt');
const express = require('express');
var app = express();
var router = express.Router();
const saltrounds = require('./../../constants').saltrounds;

router.post('/', (req, res) => {
    var today = new Date();
    var user={
      "first_name":req.body.first_name,
      "last_name":req.body.last_name,
      "email":req.body.email,
      "password":req.body.password,
      "created":today,
      "modified":today
    }
    connection.query('SELECT * FROM users WHERE email = ?', [user.email], function(error, results, fields) {
      if (results.length > 0) {
        console.log("taken");
        res.status(200);
        res.send({
          "code":"-1",
          "result":"email already taken"
        });
      } 
      else {
        bcrypt.hash(user.password, saltrounds, function(err, hashed) {
          if (err) {
            console.log("ERROR: "+ err);
          } else {
            user.password = hashed;
            connection.query('INSERT INTO users SET ?',user, function (error, results, fields) {
              if (error) {
                console.log("error ocurred",error);
                res.status(400);
                res.send({
                  "code":400,
                  "result":"error ocurred"
                });
              }else{
                console.log('The solution is: ', results);
                res.status(200);
                res.send({
                  "code":0,
                  "result":"user registered sucessfully"
                });
              }
              });
          }
        });
      }
    });
});

module.exports = router;