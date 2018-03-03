//needs refactoring

var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   res.setHeader('Content-Type', 'application/json');
   next();
});


var con = mysql.createConnection({
    host: '148.100.98.185',
    user: 'root',
    password: 'pass',
    database: 'services'
});

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.get("/getServices",function(req,res) {
    con.query("SELECT * FROM services", function (err, result, fields) {
        res.send(result);
    });
}); 

app.get("/getActiveServices",function(req,res) {                                                                                                                                  con.query("SELECT * FROM active_services", function (err, result, fields) {                                                                                                        res.send(result);                                                                                                                                                   });                                                                                                                                                                 });

app.post("/",function(req,res)
{
    con.query("insert into services(ID) values(3);", function (err, result, fields)
        {
            res.send(result);
        });
});

app.listen(3000);
