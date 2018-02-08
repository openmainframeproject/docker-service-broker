var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'services'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
	var serice_list = '';
	con.query('SELECT * FROM services')
	{
        if (err) throw err;
        serice_list = result;
    };
    res.json({"test" : "get"});
})

app.listen(3000);