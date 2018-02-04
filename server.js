// dependencies
var express = require("express")
var app = express()
var port = 3000;
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.urlencoded());
var passport = require('passport')
var session = require('express-session')
var mongoose = require("mongoose")

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User = require('./models/user'); // get our mongoose model

app.set('superSecret', config.secret);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:8080/user-db")
db = mongoose.connection;

app.listen(port, () => {
    console.log("Server listening on port " + port)
})

app.post('/adduser', function(req, res) {
    var stuff = req.body;
    newUser = new User(stuff);
    newUser.pending = 0;
    newUser.save();
    res.redirect("/login")
});

module.exports = User

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/studywhy.html")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html")
});
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});

app.get("/studywhy", (req, res) => {
    res.sendFile(__dirname + "/studywhy.html")
});
app.post("/checkLogin", (req, res) => {
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 1440 // expires in 24 hours
                });
                res.redirect("/entry?token=" + token + "&email=" + req.body.email)
            }

        }

    });
});

// allows server to access all files in the public folder (css, images, etc.)
app.use(express.static(__dirname + '/public'))

// SECURED UNDER
var token;
app.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

app.get("/entry", (req, res) => {
    res.sendFile(__dirname + "/views/entry.html")
});

app.get("/todo", (req, res) => {
    res.sendFile(__dirname + "/views/todo_list.html")
});

app.get("/calendar", (req, res) => {
    res.sendFile(__dirname + "/views/underconstruction.html")
});

app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/views/profile.html")
});

app.get("/profile_info", (req,res)=>{
    var _token = req.query.token;
    var _email = req.query.email;
    User.findOne({
        email: _email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            console.log(user)
            var stuff="<h4>Name: "+user.name+"</h4>";
            stuff+="<h4>Email: "+user.email+"</h4>";
            stuff+="<h4>Pending: "+user.pending+"</h4>";
            stuff+="<h4>Total Todos Created: "+user.__v+"</h4>";
            var html = '<!DOCTYPE html><html><head><title> To-Do </title><!-- Latest compiled and minified CSS --><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><!-- jQuery library -->    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script><!-- Latest compiled JavaScript --><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script></head><body id ="body">' + stuff + '</body></html>'
            res.send(html);
        }

    });
})

app.post("/todoSubmit", (req, res) => {
    var _token = req.query.token;
    var _description = req.body.description
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            user.todo.push(_description);
            user.pending = user.pending+1;
            user.save()
        }

    });


    res.redirect("/todo?token=" + _token + "&email=" + req.query.email)
});

app.get("/checkEmail", (req, res) => {
    var req_email = req.query.email
    var userArr = []
    User.find({}, (err, users) => {
        var userMap = {};
        var numOfUsers = 0;

        userArr = []

        users.forEach((user) => {
            userMap[user._id] = user;
            userArr.push(user.email)
            numOfUsers++;
        })
        after(numOfUsers)
    })

    function after(numOfUsers_param) {
        var email_exists = false
        for (var i = 0; i < numOfUsers_param; i++) {
            if (userArr[i] == req_email) {
                email_exists = true;
                break
            }
        }

        if (email_exists) {
            res.redirect("/entry")
        } else {
            res.redirect("/register")
        }
    }


    // res.redirect("/registered")
})

app.get("/showTodo", (req, res) => {
    var arr = [];
    var html = "";
    var table = "";
    User.findOne({
        email: req.query.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            arr = user.todo
            table = "<table style='width:100%; padding:100px;' class='table table-striped'><tr><th>Description</th><th>Click to Complete</th></tr>";
            for (var i = 0; i < arr.length; i++) {
                table += "<tr><td>" + arr[i] + "</td><td><form action='/deleteTodo?token=" + req.query.token + "&email=" + req.query.email + "&todo=" + arr[i] + "' method='post'><input class='btn btn-success' type='submit' value='Complete'></form></td></tr>"
            }
            table += "</table>"

            html = '<!DOCTYPE html><html><head><title> To-Do </title><!-- Latest compiled and minified CSS --><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><!-- jQuery library -->    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script><!-- Latest compiled JavaScript --><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script></head><body id ="body">' + table + '</body></html>'
            res.send(html)
        }
    });
});

app.post("/deleteTodo", (req, res) => {
    // '/deleteTodo?token="+req.query.token+"&email="+req.query.email+"&todo="+arr[i] +"
    var _token = req.query.token;
    var _email = req.query.email;
    var _todo = req.query.todo;
    User.findOne({
        email: req.query.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            user.todo.splice(user.todo.indexOf(_todo),1);
            user.pending = user.pending - 1;
            user.save();

            res.redirect("/showTodo?token=" + _token + "&email=" + _email)
        }
    });

});

app.get("/showusers", (req, res) => {
    var db = "user-db";
    User.find({}, (err, users) => {
        var userMap = {};
        var numOfUsers = 0;

        var userArr = [
            [], //name
            [], //email
            [], //todo
            [] //credits
        ];

        users.forEach((user) => {
            userMap[user._id] = user;

            //store into 2d array - each row is 1 user
            userArr[0].push(user.name)
            userArr[1].push(user.email)
            userArr[2].push(user.todo)
            userArr[3].push(user.credits)

            numOfUsers++;
        })

        var html = "<html><head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'><link href='style/styles.css'><style>.all_users{border:1px solid #333;padding:10px;color:#333}td,tr{border:1px solid #333;border-collapse:collapse;padding:10px;color:#333}body{padding:0px 0px}</style></head><body class='container'><table class='all_users table table-striped'>";
        html += "<tr>";
        html += "<th>Name</th>";
        html += "<th>Email</th>";
        html += "<th>To-do's</th>";
        html += "<th>Credit</th>";
        html += "</tr>";

        for (var i = 0; i < numOfUsers; i++) {

            html += "<tr>"
            for (var y = 0; y < 4; y++) {
                html += "<td>" + userArr[y][i] + "</td>";
            }
            html += "</tr>";

        }

        html += "</table><a href='http://localhost:3000/login' class='btn btn-default'>Login Page!</a></body></html>";

        res.send(html)
    })
})