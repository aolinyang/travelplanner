var mysql = require('mysql2');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.SQL_USERNAME,
  password : process.env.SQL_PASSWORD,
  database : 'travelapp',
  insecureAuth: true
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

module.exports = connection;