const connection = require('./routes/sqlconnection/connectsql');
const jwt = require('jsonwebtoken');
const secret = require('./constants').secret;
const saltrounds = require('./constants').saltrounds;
const bcrypt = require('bcrypt');

const checktoken = function(req, res, next) {

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
          let user_info = {
            id: decoded.id,
            email: decoded.email,
            first_name: decoded.first_name,
            last_name: decoded.last_name
          }
          req.body.user_info = user_info;
          //tried to use res.write but that didn't work, so I'm gonna send everything in one go instead on the actual endpoint
          next();
        }
      });
    }
}

const _toSQLObj = function(obj) {
    const keys = Object.keys(obj);
    var statement = "JSON_OBJECT(";
    keys.forEach((key) => {
        statement += "\"" + key + "\"" + ", ";
        const val = obj[key];
        if (Array.isArray(val)) {
            statement += _toSQLArr(val);
        } else if (typeof val === 'object') {
            statement += _toSQLObj(val);
        } else if (typeof val === 'string') {
            statement += '\"' + val + '\"';
        } else {
            statement += val;
        }
        statement += ", ";
    });
    return statement.slice(0, statement.length-2) + ")";
}

const _toSQLArr = function(arr) {
    var statement = "JSON_ARRAY(";
    arr.forEach((val) => {
        if (Array.isArray(val)) {
            statement += _toSQLArr(val);
        } else if (typeof val === 'object') {
            statement += _toSQLObj(val);
        } else if (typeof val === 'string') {
            statement += '\"' + val + '\"';
        } else {
            statement += val;
        }
        statement += ", ";
    });
    return statement.slice(0, statement.length-2) + ")";
}

const query = function(statement, args) {
    return new Promise((resolve, reject) => {
        connection.query(statement, args, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        } );
    } );
}

const hash = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltrounds, function(err, hashed) {
            if (err)
                return reject(err);
            resolve(hashed);
        }
    )
    });
}

const compare = function(password, hashed) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashed, function(err, hashres) {
            if (err)
                return reject(err);
            resolve(hashres);
        }
    )
    });
}

exports.checktoken = checktoken;
exports.toSQLObj = _toSQLObj;
exports.toSQLArr = _toSQLArr;
exports.query = query;
exports.hash = hash;
exports.compare = compare;