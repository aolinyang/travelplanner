var query = require('./../../utils').query;
const express = require('express');
var router = express.Router();
var auth = require('./../../utils').checktoken;

router.use(auth);

router.post('/', (req, res) => {
    
    const user_id = req.body.user_info.id;
    const trip_info = req.body.trip_info;
    const date = new Date();

    const start_date = new Date(trip_info.start_date);
    const end_date = new Date(trip_info.end_date);
    let startStatus = "Not Started";
    if (new Date() > end_date) {
        startStatus = "Complete";
    } else if (new Date() > start_date) {
        startStatus = "Ongoing";
    }

    var trip_id;
    const statement1 = "INSERT INTO trips (user_id, trip_name, trip_type, start_date, end_date, status) values (?, ?, ?, ?, ?, ?)";
    const statement2 = "INSERT INTO itemlists (user_id, trip_id, essentials, food, clothing, toiletries, entertainment, misc) values (?, ?, JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY())";
    
    query(statement1, [user_id, trip_info.trip_name, trip_info.trip_type, trip_info.start_date, trip_info.end_date, startStatus]).then((result) => {

        trip_id = result.insertId;
        return query(statement2, [user_id, trip_id]);

    }).then((result) => {

        res.send({
            "code":0,
            "result":"successfully added new trip",
            "trip_info":{
                "trip_id":trip_id
            }
        });

    }).catch((err) => {

        console.log(err);
        res.status(500);
        res.end();

    });

});

module.exports = router;