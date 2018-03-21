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

app.get("/isAuthed",function(req,res) {
    authData = req.query.auth;
    data = Buffer.from(authData, 'base64').toString().split(":");
    username = data[0];
    password = data[1];
    con.query("SELECT * from users where username=? and password=?", [username, password], function(err, results, fields){
      authObj=Object();
      authObj.auth=false;
      if (results.length===1){
        authObj.auth=true;
        res.send(authObj);
      }else{
        res.send(authObj);
      }
    });
});

app.get("/getServices",function(req,res) {
    con.query("SELECT * FROM services", function (err, result, fields) {
        res.send(result);
    });
}); 

app.get("/getActiveServices",function(req,res) {
	con.query("SELECT * FROM active_services", function (err, result, fields) {
		res.send(result);
	});
});


//support json format
app.use( bodyParser.json() );

app.post("/startService",function(req,res)
{
	console.log(req.body);
	var name = req.body.name,
		description = req.body.description,
		version = req.body.version,
		fields = JSON.stringify(req.body.fields);
	con.query("insert into active_services(name, description, version, fields) values (?, ?, ?, ?);", 
		[name, description, version, fields],
		function (err, result, fields)
        {
            res.send(result);
        });
});

app.listen(3000);
