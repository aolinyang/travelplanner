const query = require('./../../utils').query;
const express = require('express');
var router = express.Router();
var auth = require('./../../utils').checktoken;

router.use(auth);

router.post('/', (req, res) => {

    const user_id = req.body.user_info.id;
    query('DELETE FROM users WHERE id = ?', [user_id]).then((rows) => {
        res.clearCookie("token");
        res.status(200).send({
            "code":0,
            "result":"successfully deleted user"
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });

});

module.exports = router;