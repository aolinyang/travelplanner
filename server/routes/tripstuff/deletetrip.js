var query = require('./../../utils').query;
const express = require('express');
var router = express.Router();
var auth = require('./../../utils').checktoken;

router.use(auth);

router.post('/', (req, res) => {

    const user_id = req.body.user_info.id;
    const trip_id = req.body.trip_info.trip_id;

    query('SELECT user_id FROM trips WHERE trip_id = ?', [trip_id]).then((rows) => {

        if (user_id != rows[0].user_id) {
            throw new Error("not your trip");
        }
        return query('DELETE FROM trips WHERE trip_id = ?', [trip_id]);

    }).then((rows) => {
        res.status(200).send({
            "code":0,
            "result":"successfully deleted trip"
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