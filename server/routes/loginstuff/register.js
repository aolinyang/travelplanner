const query = require('./../../utils').query;
const express = require('express');
var router = express.Router();
const hash = require('./../../utils').hash;

router.post('/', (req, res) => {
    var today = new Date();
    const user_info = req.body.user_info;
    user_info.created = today;
    user_info.modified = today;
    query('SELECT * FROM users WHERE email = ?', [user_info.email]).then((rows) => {
        if (rows.length > 0) {
          throw new Error("email taken");
        }
        return hash(user_info.password);
      }
    ).then((hashed) => {

      user_info.password = hashed;
      return query('INSERT INTO users SET ?',user_info);

    }).then((rows) => {

      res.status(200);
      res.send({
        "code":0,
        "result":"user registered sucessfully"
      });

    }).catch((err) => {

      if (err.message === "email taken") {
          res.status(200);
          res.send({
            "code":"-1",
            "result":"email already taken"
          });
      } else {
        console.log(err);
        res.status(500).end();
      }

    });
});

module.exports = router;