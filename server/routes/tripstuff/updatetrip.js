var query = require('./../../utils').query;
const express = require('express');
var router = express.Router();
var auth = require('./../../utils').checktoken;
var toArr = require('./../../utils').toSQLArr;

var user_id;
var trip_id;

//transforms an array of JSON elements into an array readable by MySQL query
const arrToArr = function(arr) {

    let ans = [];
    arr.forEach((obj) => {
        let curArr = [user_id, trip_id];
        const keys = Object.keys(obj);
        keys.forEach((key) => {
            curArr.push(obj[key]);
        });
        ans.push(curArr);
    });
    return ans;

}

router.use(auth);

router.post('/', (req, res) => {
    
    user_id = req.body.user_info.id;
    const trip_info = req.body.trip_info;
    trip_id = trip_info.trip_id;
    const item_list = req.body.trip_info.item_list;
    const places = req.body.trip_info.places;
    const lodging = req.body.trip_info.lodging;
    const travel_log = req.body.trip_info.travel_log;

    query("SELECT user_id FROM trips WHERE trip_id = ?", [trip_id]).then((rows) => {

        if (user_id != rows[0].user_id) {
            throw new Error("not your trip");
        }
        return query("UPDATE LOW_PRIORITY trips SET trip_type = ?, start_date = ?, end_date = ?, completed = ? WHERE trip_id = ?", [trip_info.trip_type, trip_info.start_date, trip_info.end_date, trip_info.completed, trip_id]);

    }).then((results) => {

        var itemlist_data = [item_list.essentials, item_list.food, item_list.clothing, item_list.toiletries, item_list.entertainment, item_list.misc];
        var fid = itemlist_data.map(toArr);
        const items_statement = "UPDATE LOW_PRIORITY itemlists SET essentials = " + fid[0] + ", food = " + fid[1] + ", clothing = " + fid[2] + ", toiletries = " + fid[3] + ", entertainment = " + fid[4] + ", misc = " + fid[5] + " WHERE trip_id = ?";
        return query(items_statement, [trip_id]);

    }).then((results) => {

        return query("DELETE FROM places WHERE trip_id = ?", [trip_id]);

    }).then((results) => {

        const statement = "INSERT INTO places (user_id, trip_id, start_datetime, end_datetime, location, description) VALUES ?";
        const values = arrToArr(places);
        return query(statement, [values]);

    }).then((results) => {

        return query("DELETE FROM lodging WHERE trip_id = ?", [trip_id]);

    }).then((results) => {

        const statement = "INSERT INTO lodging (user_id, trip_id, date, location, fee) VALUES ?";
        const values = arrToArr(lodging);
        return query(statement, [values]);

    }).then((results) => {

        return query("DELETE FROM travel_logs WHERE trip_id = ?", [trip_id]);

    }).then((results) => {

        const statement = "INSERT INTO travel_logs (user_id, trip_id, date, log) VALUES ?";
        const values = arrToArr(travel_log);
        return query(statement, [values]);

    }).then((results) => {

        res.status(200).send({
            "code":0,
            "result":"successfully updated trip " + trip_id
        });

    }).catch((err) => {

        if (err.message === 'not your trip') {
            res.status(403).end();
        } else {
            console.log(err);
            res.status(500).end();
        }

    });

});

module.exports = router;