var query = require('./../../utils').query;
const express = require('express');
var router = express.Router();
var auth = require('./../../utils').checktoken;

router.use(auth);

router.post('/', (req, res) => {
    
    const user_id = req.body.user_info.id;
    
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hr = date.getHours();
    const min = date.getMinutes();
    const formattedDate = year+"-"+month+"-"+day+" "+hr+":"+min+":00";

    var trip_id;
    const statement1 = "INSERT INTO trips (user_id, trip_name, trip_type, start_date, end_date, completed) values (?, ?, ?, ?, ?, false)";
    const statement2 = "INSERT INTO itemlists (user_id, trip_id, essentials, food, clothing, toiletries, entertainment, misc) values (?, ?, JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY(), JSON_ARRAY())";
    
    query(statement1, [user_id, "My Trip", " ", formattedDate, formattedDate]).then((result) => {

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