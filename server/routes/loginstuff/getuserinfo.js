//for if the user closes the site and the react state is lost

const express = require('express');
var router = express.Router();
var auth = require('./../../utils').checktoken;

router.use(auth);

router.get('/', (req, res) => {
    
    res.send({
        'code':'0',
        'result':'data successfully retrieved',
        'user_info':req.body.user_info
    });

});

module.exports = router;