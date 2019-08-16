if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

var router = express.Router();

const registerRouter = require('./routes/loginstuff/register');
const loginRouter = require('./routes/loginstuff/login');
const logoutRouter = require('./routes/loginstuff/logout');
const userInfoRouter = require('./routes/loginstuff/getuserinfo');

const getTripsRouter =  require('./routes/tripstuff/gettrips');
const newTripRouter = require('./routes/tripstuff/newtrip');
const updateTripRouter = require('./routes/tripstuff/updatetrip');
const deleteTripRouter = require('./routes/tripstuff/deletetrip');
const deleteUserRouter = require('./routes/loginstuff/deleteuser');

//const dashRouter = require('./routes/studyguide/dashboard');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.end();
      }
      else {
      //move on
        next();
      }
});

app.use(function(req, res, next) {
    console.log("HTTP request: " + req.method + " " + req.path);
    console.log("Body: " + JSON.stringify(req.body, null, 3));
    console.log("Cookies: " + JSON.stringify(req.cookies, null, 3));
    console.log();
    next();
});

// test route
app.get('/', function(req, res) {
    res.json({ message: 'Howdy!' });
});

app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/getuserinfo', userInfoRouter);

app.use('/api/gettrips', getTripsRouter);
app.use('/api/newtrip', newTripRouter);
app.use('/api/updatetrip', updateTripRouter);
app.use('/api/deletetrip', deleteTripRouter);
app.use('/api/deleteuser', deleteUserRouter);

//app.use('/dashboard', dashRouter);

app.listen(port);