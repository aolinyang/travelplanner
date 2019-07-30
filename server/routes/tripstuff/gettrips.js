var connection = require('./../sqlconnection/connectsql');
const express = require('express');
var app = express();
var router = express.Router();
var auth = require('./../../checktoken');
var mysql = require('mysql2');

router.use(auth);

router.get('/', (req, res) => {
    
    const user_id = req.body.id;
    const temp_tablename = 'user_trips_' + user_id;
    console.log(temp_tablename);
    connection.query('CREATE TEMPORARY TABLE ' + temp_tablename + ' SELECT * FROM trips WHERE user_id = ?', [user_id], (err, rows, fields) => {
        if (err) {
            connection.query('DROP TEMPORARY TABLE ' + temp_tablename, (err2, rows2) => {
                console.log('1: ' + err);
                res.status(500);
                res.end();
            });
        } else {
            //console.log(rows[0]);
            connection.query('SELECT * FROM ' + temp_tablename + ' INNER JOIN itemlists ON ' + temp_tablename + '.trip_id = itemlists.trip_id', (err2, rows2, fields) => {
                if (err) {
                    console.log('2: ' + err2);
                    res.status(500);
                    res.end();
                } else {
                    //console.log(rows2);
                    res.send({
                        'code':0,
                        'result':'successfully retrieved trips',
                        'body':rows2
                     });
                    connection.query('DROP TEMPORARY TABLE ' + temp_tablename, (err3, rows3, fields) => {
                        if (err3) {
                            console.log('3: ' + err3);
                        }
                    });
                }
            });
        }
    });

});

module.exports = router;
