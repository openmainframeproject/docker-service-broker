//needs refactoring

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
        if (results.length===1)
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
        res.send(result);
    });
});


app.get("/claim",function(req,res)
{
    id = req.query.id
    workerid=req.query.workerid
    con.query("SELECT * FROM active_services where ID=? AND NOT status<=>'claimed'",[id], function (err, result, fields)
    {
	console.log(result);
        if (result.length>0){
            con.query("update active_services set status='claimed', workerID=? where id=?",[workerid, id], function (err, result, fields)
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
    console.log(req.body);
    var name = req.body.name,
            description = req.body.description,
            version = req.body.version,
            fields = JSON.stringify(req.body.fields);
    con.query("insert into active_services(name, description, version, fields) values (?, ?, ?, ?);",
        [name, description, version, fields],
        function (err, result, fields)
    {
        console.log("got here");
        console.log(err);
        res.send(result);
    });

    var id = con.query("SELECT ID FROM active_services ORDER BY id DESC LIMIT 1;",
        function (err, result, fields)
    {
        console.log(result);
        console.log(err);
        var id = result[0].ID;
        startService(id);
    });

    function startService(ID)
    {
        //var id = value;

        const { exec } = require('child_process');
        //name + ID to make unique identifier which is still readable
        exec('docker service create --name ' + name + ID + ' ' + name, (error, stdout, stderr) =>
        {
            if (error)
            {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }
});

app.post("/addGroup",function(req,res)
{
    con.query("insert into groups (name, description) values (?,?)",[req.body.name, req.body.description], function (err, result, fields)
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

    con.query("delete from active_services where name = ?;",
        [name],
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

app.listen(3000);
