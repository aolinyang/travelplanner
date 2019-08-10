var query = require('./../../utils').query;
const express = require('express');
var router = express.Router();
var auth = require('./../../utils').checktoken;

router.use(auth);

router.get('/', (req, res) => {
    
    const user_id = req.body.user_info.id;

    let trips;
    let mapper = {};

    query('SELECT * FROM trips WHERE user_id = ?', [user_id]).then((rows) => {

        if (rows.length === 0) {
            throw new Error("no trips yet");
        }
        trips = rows;
        for (let i = 0; i < trips.length; i++) {
            mapper[trips[i].trip_id] = i;
            trips[i].item_list = [];
            trips[i].places = [];
            trips[i].lodging = [];
            trips[i].travel_log = [];
        }
        return query('SELECT * FROM itemlists WHERE user_id = ?', [user_id]);

    }).then((rows) => {

        rows.forEach((row) => {
            trips[mapper[row.trip_id]].item_list.push(row);
        })
        return query('SELECT * FROM places WHERE user_id = ?', [user_id]);

    }).then((rows) => {

        rows.forEach((row) => {
            trips[mapper[row.trip_id]].places.push(row);
        })
        return query('SELECT * FROM lodging WHERE user_id = ?', [user_id]);

    }).then((rows) => {

        rows.forEach((row) => {
            trips[mapper[row.trip_id]].lodging.push(row);
        })
        return query('SELECT * FROM travel_logs WHERE user_id = ?', [user_id]);

    }).then((rows) => {

        rows.forEach((row) => {
            trips[mapper[row.trip_id]].travel_log.push(row);
        })
        
        res.send({
            'code':0,
            'result':'successfully retrieved trips',
            'all_trips':trips
         });

    }).catch((err) => {

        if (err.message === "no trips yet") {
            res.status(200).send({
                "code":-1,
                "result":"no trips yet"
            });
        }
        else {
            console.log(err);
            res.status(500).end();
        }

    });

});

module.exports = router;