const express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    res.clearCookie('token');
    res.send({
        'code':0,
        'result':'successfully logged out'
    });
});

module.exports = router;