const jwt = require('jsonwebtoken');
const secret = require('./constants').secret;

module.exports = function(req, res, next) {

    const token = req.cookies.token;

    //if token isn't found at all
    if (!token) {
      res.status(200).send({
          'code':-1,
          'result':'Unauthorized, No token provided'
        });
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        //if token is wrong
        if (err) {
          res.status(200).send({
              'code': -2,
              'result':'Unauthorized, Invalid token'
            });
        } else {
          req.body.id = decoded.id;
          req.body.email = decoded.email;
          req.body.first_name = decoded.first_name;
          req.body.last_name = decoded.last_name;
          //tried to use res.write but that didn't work, so I'm gonna send everything in one go instead on the actual endpoint
          next();
        }
      });
    }
  }