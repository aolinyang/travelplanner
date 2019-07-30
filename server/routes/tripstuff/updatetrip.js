var connection = require('./../sqlconnection/connectsql');
const express = require('express');
var app = express();
var router = express.Router();
var auth = require('./../../checktoken');
var toArr = require('./../../utils').toSQLArr;

router.use(auth);

router.post('/', (req, res) => {
    
    const user_id = req.body.id;
    const trip_info = req.body.trip_info;
    const trip_id = trip_info.trip_id;
    const item_list = req.body.item_list;
    connection.query('SELECT * FROM trips WHERE trip_id = ?', [trip_id], (err, rows) => {
        if (err) {
            res.status(500);
            res.end();
        } 
        else if (user_id != rows[0].user_id) {
            res.status(200).send({
                code:-1,
                result:'this is not one of your trips'
            });
        }
        else {

            var trip_data = [trip_info.places, trip_info.lodging, trip_info.travel_log];
            //formatted trip data
            var ftd = trip_data.map(toArr);

            const statement = "UPDATE LOW_PRIORITY trips SET start_date = ?, end_date = ?, places = " + ftd[0] + ", lodging = " + ftd[1] + ", travel_log = " + ftd[2] + ", completed = ? WHERE trip_id = " + trip_id;
            console.log(statement);
            connection.query(statement, [trip_info.start_date, trip_info.end_date, trip_info.completed], (err2, results) => {

                if (err2) {
                    console.log(err2);
                    res.status(500);
                    res.end();
                } else {

                    var itemlist_data = [item_list.essentials, item_list.food, item_list.clothing, item_list.toiletries, item_list.entertainment, item_list.misc];
                    var fid = itemlist_data.map(toArr);
                    const statement2 = "UPDATE LOW_PRIORITY itemlists SET essentials = " + fid[0] + ", food = " + fid[1] + ", clothing = " + fid[2] + ", toiletries = " + fid[3] + ", entertainment = " + fid[4] + ", misc = " + fid[5] + " WHERE trip_id = " + trip_id;
                    connection.query(statement2, (err3, results2) => {

                        if (err3) {
                            console.log(err3);
                            res.status(500);
                            res.end();
                        } else {
                            res.status(200).send({
                                "code":0,
                                "result":"successfully updated trip"
                            });
                        }

                    });

                }

            });

        }
    });

});

module.exports = router;