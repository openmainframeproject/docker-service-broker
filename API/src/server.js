//needs refactoring

var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

var con = mysql.createConnection({
    host: '148.100.98.185',
    user: 'root',
    password: 'pass',
    database: 'services'
});

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res) {
    con.query("SELECT * FROM services", function (err, result, fields) {
        res.send(result);
    });
});

app.listen(3000);
