if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const query = require('./../../utils').query;
const compare = require('./../../utils').compare;
const express = require('express');
var router = express.Router();
const timeout = parseInt(process.env.TIMEOUT);
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {

    var email= req.body.user_info.email;
    var password = req.body.user_info.password;
    var ui;

    query('SELECT * FROM users WHERE email = ?',[email]).then((rows) =>{

        if (rows.length == 0) {
          throw new Error("email not found");
        }
        ui = rows[0];
        return compare(password, ui.password);

    }).then((hashres) => {

      if (!hashres){
        throw new Error("incorrect password");
      }
      let userdata = {
        id: ui.id,
        first_name: ui.first_name,
        last_name: ui.last_name,
        email: email
      };
      const token = jwt.sign(userdata, secret, {expiresIn: '10h'});
      //httpOnly: true because no reason for client to know token value
      //later on, test if secure: false is needed
      res.cookie('user_info', JSON.stringify(userdata), {httpOnly: false, maxAge: timeout, secure: false});
      res.status(200).cookie('token', token, { httpOnly: true, maxAge: timeout, secure: false}).send({
        "code":0,
        "result":"login sucessful",
        "user_info": userdata
      });

    }).catch((err) => {

      if (err.message === "email not found") {
        res.status(200).send({
          "code":-1,
          "result":"Email does not exist"
        });
      } else if (err.message === "incorrect password") {
        res.status(200);
        res.send({
          "code":1,
          "result":"Wrong password"
        });
      } else {
        console.log(err);
        res.status(500).end();
      }

    })
    
});

module.exports = router;