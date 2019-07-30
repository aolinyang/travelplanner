var connection = require('./../sqlconnection/connectsql');
const express = require('express');
var app = express();
var router = express.Router();
var auth = require('./../../checktoken');

router.use(auth);

router.post('/', (req, res) => {
    
    const user_id = req.body.id;
    const statement = "INSERT INTO trips (user_id, start_date, end_date, places, lodging, travel_log, completed) values (" + user_id + ", ?, ?, JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY(), false)";
    
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hr = date.getHours();
    const min = date.getMinutes();
    const formattedDate = year+":"+month+":"+day+" "+hr+":"+min+":00";
    
    connection.query(statement, [formattedDate, formattedDate], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.end();
        } else {
            const statement2 = "INSERT INTO itemlists (trip_id, essentials, food, clothing, toiletries, entertainment, misc) values (" + result.insertId + ", JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY())";
            connection.query(statement2, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.end();
                } else {
                    console.log("Successfully added new trip!")
                    res.send({
                        "code":0,
                        "result":"successfully added new trip"
                    });
                }
            });
        }
    });

});

module.exports = router;