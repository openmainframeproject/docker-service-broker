//needs refactoring
var request = require('request');
var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

var allowCrossDomain = function(req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method)
    {
        res.sendStatus(200);
    }
    else
    {
        next();
    }
};
app.use(allowCrossDomain);

var con = mysql.createConnection
({
    host: '148.100.98.185',
    user: 'root',
    password: 'pass',
    database: 'services'
});

app.get("/isAuthed",function(req,res)
{
    authData = req.query.auth;
    data = Buffer.from(authData, 'base64').toString().split(":");
    username = data[0];
    password = data[1];
    con.query("SELECT * from users where username=? and password=?", [username, password], function(err, results, fields){
        authObj=Object();
        authObj.auth=false;
        if (results && results.length===1)
        {
            authObj.auth=true;
            res.send(authObj);
        }
        else
        {
        res.send(authObj);
        }
    });
});

app.get("/isAdmin",function(req,res)
{
    authData = req.query.auth;
    data = Buffer.from(authData, 'base64').toString().split(":");
    username = data[0];
    password = data[1];
    con.query("SELECT * from users where username=? and password=? and admin=true", [username, password], function(err, results, fields){
        authObj=Object();
        authObj.auth=false;
        if (results && results.length===1)
        {
            authObj.auth=true;
            res.send(authObj);
        }
        else
        {
        res.send(authObj);
        }
    });
});

app.get("/getServices",function(req,res)
{
    con.query("SELECT * FROM services", function (err, result, fields)
    {
        res.send(result);
    });
});

app.get("/getUsers",function(req,res)
{
    con.query("SELECT * FROM users", function (err, result, fields)
    {
        res.send(result);
    });
});


app.get("/getGroups",function(req,res)
{
    con.query("SELECT * FROM groups", function (err, groups, fields1)
    {
            con.query("select * from groups_services where group_id in (select id from groups)", function (err, groups_services, fields2){
                con.query("SELECT * FROM services", function (err, services, fields2)
                {
                    retGroups = []
                    for (i =0;i<groups.length;i++){
                        group = groups[i]
                        group.services = [];
                        servicesList = [];
                        for (j=0;j<groups_services.length;j++){
                            g = groups_services[j]
                            if (g.group_id == group.ID){
                                servicesList.push(g.service_id);
                            }
                        };
                        for (y=0;y<services.length;y++){
                            service=services[y];
                            if (servicesList.indexOf(service.ID) != -1){
                                group.services.push(service);
                            }
                        }
                        retGroups.push(group);
                    }
                    res.send(retGroups);
                });
            });
            
    });
});


app.get("/getQueuedServices",function(req,res)
{
    con.query("SELECT * FROM active_services where status='initializing'", function (err, result, fields)
    {
        console.log(result);
        res.send(result);
   });
});


app.get("/claim",function(req,res)
{
    //id = req.query.id
    workerid=req.query.workerid
    con.query("SELECT * FROM active_services where NOT status='claimed'", function (err, result, fields)
    {
	console.log(result);
        if (result.length>0){
            con.query("update active_services set status='claimed'", function (err, result, fields)
            {
                console.log("claimed");
                res.send(result);
            });
        }else{
            res.send({"error":"Claim failed."})
        }
    });
});

app.get("/getActiveServices",function(req,res)
{
    con.query("SELECT * FROM active_services", function (err, result, fields)
    {
        res.send(result);
    });
});


//support json format
app.use( bodyParser.json() );

app.post("/startService",function(req,res)
{
    console.log("start service");
    console.log(req.body);
    var name = req.body.name,
            description = req.body.description,
            version = req.body.version,
            fields = JSON.stringify(req.body.fields);
    if(fields != "null")
    {
        fields = fields.replace(/\\/g, '');
        //fields = fields.substring(1,fields.length-1);
    }
    else
    {
        fields = JSON.parse(fields);
    }
    con.query("insert into active_services(name, description, version, fields, status) values (?, ?, ?, ?, 'initializing');",
        [name, description, version, fields],
        function (err, result, fields)
    {
        console.log("got here");
        console.log(err);
        res.send(result);
    });
});


app.post("/removeService",function(req,res)
{
    con.query("delete from services where ID=?",[req.body.ID], function (err, result, fields)
    {
        res.send(result);
    });
});


app.post("/addGroup",function(req,res)
{
    con.query("insert into groups (name, description) values (?,?)",[req.body.name, req.body.description], function (err, result, fields)
    {
        res.send(result);
    });
});

app.post("/addUser",function(req,res)
{
    con.query("insert into users (username, password, admin) values (?,?,?)",[req.body.username, req.body.password, req.body.admin], function (err, result, fields)
    {
        res.send(result);
    });
});

app.post("/addToGroup",function(req,res)
{
    con.query("insert into groups_services (group_id, service_id) values (?,?)",[req.body.group_id, req.body.service_id], function (err, result, fields)
    {
        res.send(result);
    });
});


app.post("/removeUser",function(req,res)
{
    console.log("got here!!");
    con.query("delete from users where username=?",[req.body.username], function (err, result, fields)
    {
        res.send(result);
    });
});

app.post("/removeFromGroup",function(req,res)
{
    console.log("got here");
    console.log(req.body);
    con.query("delete from groups_services where group_id=? and service_id=?",[req.body.group_id, req.body.service_id], function (err, result, fields)
    {
        res.send(result);
    });
});


app.post("/deleteGroup",function(req,res)
{
    con.query("delete from groups_services where group_id=?",[req.body.ID], function (err, result, fields)
    {
        con.query("delete from groups where ID=?",[req.body.ID], function (err, result, fields)
        {
            res.send({"completed":true})
        });
    });
});

app.post("/endService", function(req,res)
{
    console.log(req.body);
    var id = req.body.ID,
        name = req.body.name;

    con.query("delete from active_services where ID = ?;",
        [id],
        function (err, result, fields)
    {
        res.send(result);
    });

    const { exec } = require('child_process');
    //name + ID to make unique identifier which is still readable
    exec('docker service rm ' + name + id, (error, stdout, stderr) =>
    {
        if (error)
        {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
});

app.post("/runningStatus", function(req,res)
{
    console.log(req.body)
    console.log(req.body.ID)
    con.query("update active_services set status = 'running' where ID=?",[req.body.ID], function (err, result, fields)
    {
      console.log("runningStatus query")
      res.send(result);
    });
});

app.post("/startGroup", function(req,res)
{
    //console.log(req.body);
    //console.log("----------------------------------------");
    //console.log(req.body.services);
    //var len = req.body.services;
    //console.log("----------------------------------------");
    //console.log(req.body['services']);
    console.log(req.body);
    console.log(" ");
    console.log(" ");

    var jsonData=req.body['services'];
    //console.log(jsonData);
    console.log("----------------------------------------");
    for(var service in jsonData)
    {
      var output = service;
      console.log(jsonData[service]);
      console.log("----------------------------------------");
      request
      ({
        url: "http://148.100.98.185:3000/startService",
        method: "POST",
        json:jsonData[service],
        function(err, result, fields)
        {
          res.send(result);
        }
      });
    }


//      console.log("SERVICE                               SERVICE")
//      var options =
//      {
//        host: '148.100.98.185',
//        path: '/startService',
//        port: '3000',
//        method: 'POST',
//        body: service
//      };
//
//      var req = http.request(options, function (error, response)
//      {
//        res.send(req);
//      });
//    }
});





app.post("/addService", function(req,res)
{
    var params = '--replicas 5';
    console.log(req.body);
    console.log(req.body.fields);
    for(i = 0;i < req.body.fields.length; i++)
    {  
      if(req.body.fields[i].label == 'parameters')
      {
        var params = req.body.fields[i].value;
        console.log(params);
      }
    }
    con.query("insert into services (name, description, fields, parameters, image, version) values(?,?,?,?,?,?)",[req.body.name, req.body.description, JSON.stringify(req.body.fields), params, req.body.image, req.body.version], function (err, result, fields)
     {
       console.log("runningStatus query")
       res.send(result);
     });
});



app.listen(3000);
