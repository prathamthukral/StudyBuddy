// defaults
var express = require("express")
var app = express()
var port = 3000;

// token setup - jwt + cookie parser
var jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
app.use(cookieParser())

// hash passwords
const crypto = require('crypto');
const secret = 'somesecret';
function hash(text) {
    return crypto.createHmac('sha256', secret).update(text).digest('hex');
}

// body parser - read form inputs
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// database setup - mongoose
var mongoose = require("mongoose")
mongoose.connect("mongodb://<username>:<password>@ds247674.mlab.com:47674/studybuddy") // PLEASE SET THESE UP YOURSELF ON MLAB
db = mongoose.connection;
var User = require('./models/buddies'); // get our mongoose model

// start server
app.listen(port, () => {
    console.log("Server listening on port " + port)
})

module.exports = User

// allows server to access all files in the public folder (css, images, etc.)
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/login.html")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html")
});

app.get("/logout", (req, res) => {
    res.clearCookie('token')
        .clearCookie('user')
        .sendFile(__dirname + "/views/login.html")
});

app.post("/checkLogin", (req, res) => {
    User.findOne({
        email: req.body.email
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password != hash(req.body.password)) {
                res.json({ success: false, message: 'Authentication failed. Incorrect login values.' });
            } else {
                var token = jwt.sign({ email: user.email }, secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                // res.status(200).send({ auth: true, err: null, token })
                res.cookie('token', token, { httpOnly: true })
                    .cookie('user', user, { httpOnly: true })
                    .redirect("/entry")
            }
        }
    });
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});

app.post('/adduser', function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (user) {
            res.json({ success: false, message: 'Authentication failed. Email already exists.' });
        } else {
            var newUser = new User({
                name: req.body.name,
                password: hash(req.body.password),
                email: req.body.email,
                todos: []
            });
            newUser.pending = 0;
            newUser.save();
            res.redirect("/login")
        }
    });
})

// jwt handling
const verifyToken = function (req, res, next) {
    const token = req.cookies.token
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                res.email = decoded.email;
                next();
            }
        });
    }
}

app.get("/entry", verifyToken, (req, res) => {
    // res.send(req.cookies.user)
    // res.sendFile(__dirname + "/views/profile.html")
    res.sendFile(__dirname + "/views/entry.html")
})

app.get("/showusers", verifyToken, (req, res, next) => {
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
            userArr[2].push(user.password)

            numOfUsers++;
        })

        var html = "<html><head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'><link href='style/styles.css'><style>.all_users{border:1px solid #333;padding:10px;color:#333}td,tr{border:1px solid #333;border-collapse:collapse;padding:10px;color:#333}body{padding:0px 0px}</style></head><body class='container'><table class='all_users table table-striped'>";
        html += "<tr>";
        html += "<th>Name</th>";
        html += "<th>Email</th>";
        html += "<th>Password</th>";
        html += "</tr>";

        for (var i = 0; i < numOfUsers; i++) {

            html += "<tr>"
            for (var y = 0; y < 3; y++) {
                html += "<td>" + userArr[y][i] + "</td>";
            }
            html += "</tr>";

        }

        html += "</table><a href='http://localhost:3000/login' class='btn btn-default'>Login Page</a></body></html>";

        res.send(html)
    })
});

app.get("/todo", verifyToken, (req, res, next) => {
    // res.sendFile(__dirname + "/views/todo_list.html")
    var html = ""
    var navBar = require("./views/navBar")
    html += navBar.navBarTodo()
    html += `<iframe id="internalPage" style='height:300vh;' src="/showTodo"></iframe>`
    html += "</body>"
    res.send(html)
});

app.get("/calendar", verifyToken, (req, res, next) => {
    // res.sendFile(__dirname + "/views/underconstruction.html")
    var html = ""
    var navBar = require("./views/navBar")
    html += navBar.navBarCalendar()
    html +=
        `<div class="container">
    <img src="/pictures/underconstruction.png" style="height:50vh; width:auto;" alt="under Construction">
    <h1>Currently Under Construction</h1>
    <h4>We are looking at integrating Google Sign-in and along with it, google calendar and various other APIs that
        will ensure the most effective study sessions!</h4>
    <a class="entryLink btn btn-default" href="/todo">Go Back</a>
    </div>`
    html += "</body>"
    res.send(html)

});

app.get("/profile", verifyToken, (req, res, next) => {
    var html = ""
    var navBar = require("./views/navBar")
    html += navBar.navBarProfile()
    html += `<iframe id="internalPage" src="/profile_info"></iframe>`
    html += "</body>"
    res.send(html)
});

app.get("/profile_info", verifyToken, (req, res, next) => {
    User.findOne({
        email: req.cookies.user.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            var stuff = "<h4>Name: " + user.name + "</h4>";
            stuff += "<h4>Email: " + user.email + "</h4>";
            if (user.todos.length == 0) {
                stuff += "<h4> Pending Todos: None </h4>";
            } else {
                stuff += "<h4><a href='/todo'>Pending Todos</a>: " + user.todos.length + "</h4>";
            }
            var html = `
            <!DOCTYPE html>
            <html>
            
            <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><!-- jQuery library -->
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script><!-- Latest compiled JavaScript -->
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                <style>
                    body{
                        padding:15px;
                    }
                </style>
            </head>
            
            <body>` + stuff + '</body></html>'
            res.send(html);
        }
    });
})

app.post("/todoSubmit", verifyToken, (req, res, next) => {
    var _token = req.query.token;
    var _description = req.body.description
    User.findOne({
        email: req.body.email
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            user.todo.push(_description);
            user.pending = user.pending + 1;
            user.save()
        }

    });

    res.redirect("/todo")
});

app.get("/showTodo", verifyToken, (req, res, next) => {
    var arr = [];
    var html = "";
    var table = "";

    User.findOne({
        email: req.cookies.user.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            arr = user.todos
            // pending
            table = "<div class='container' style='border:1px solid black; border-radius:4px;'><h1>Pending</h1><table style='padding:10px; width:100%;' class='table table-striped'><tr><th>Number</th><th>Description</th><th>Click to Complete</th></tr>";
            for (var i = 0; i < arr.length; i++) {
                if (!arr[i].completed && !arr[i].hidden) {
                    table += "<tr><td>" + (i + 1) + "</td><td>" + arr[i].title + "</td><td><form action='/completeTodo?todo=" + i + "' method='post'><input class='btn btn-success' type='submit' value='Complete'></form></td></tr>"
                }
            }
            table += "</table></div>"

            // completed
            table += "<div class='container' style='border:1px solid black; border-radius:4px;'><h1>Completed</h1><table style='padding:10px; width:100%;' class='table table-striped'><tr><th>Number</th><th>Description</th><th>Click to push back to Pending</th><th>Click to Delete</th></tr>";
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].completed && !arr[i].hidden) {
                    table += "<tr><td>" + (i + 1) + "</td><td>" + arr[i].title + "</td><td><form action='/uncompleteTodo?todo=" + i + "' method='post'><input class='btn btn-warning' type='submit' value='Not Complete'></form></td><td><form action='/deleteTodo?todo=" + i + "' method='post'><input class='btn btn-danger' type='submit' value='Delete'></form></td></tr>"
                }
            }
            table += "</table></div>"

            //deleted
            table += "<div class='container' style='border:1px solid black; border-radius:4px;'><h1>Deleted</h1><table style='padding:10px; width:100%;' class='table table-striped'><tr><th>Number</th><th>Description</th><th>Click to Unhide</th></tr>";
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].hidden) {
                    table += "<tr><td>" + (i + 1) + "</td><td>" + arr[i].title + "</td><td><form action='/undeleteTodo?todo=" + i + "' method='post'><input class='btn btn-danger' type='submit' value='Unhide'></form></td></tr>"
                }
            }
            table += "</table>"

            html = '<!DOCTYPE html><html><head><title> To-Do </title><!-- Latest compiled and minified CSS --><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><!-- jQuery library -->    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script><!-- Latest compiled JavaScript --><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><style>div{margin-bottom:10px;}</style></head><body id ="body">' + table + '</div></body></html>'
            res.send(html)
        }
    });
});

app.post("/completeTodo", verifyToken, (req, res, next) => {
    var _todo = req.query.todo;
    User.findOne({
        email: req.cookies.user.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // user.todos[_todo].hidden = true
            user.todos[_todo].completed = true
            user.save();

            res.redirect("/showTodo")
        }
    });
});

app.post("/uncompleteTodo", verifyToken, (req, res, next) => {
    var _todo = req.query.todo;
    User.findOne({
        email: req.cookies.user.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // user.todos[_todo].hidden = true
            user.todos[_todo].completed = false
            user.save();

            res.redirect("/showTodo")
        }
    });
});

app.post("/undeleteTodo", verifyToken, (req, res, next) => {
    var _todo = req.query.todo;
    User.findOne({
        email: req.cookies.user.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            user.todos[_todo].hidden = false
            // user.todos[_todo].completed = true
            user.save();

            res.redirect("/showTodo")
        }
    });
});

app.post("/deleteTodo", verifyToken, (req, res, next) => {
    var _todo = req.query.todo;
    User.findOne({
        email: req.cookies.user.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            user.todos[_todo].hidden = true
            user.save();

            res.redirect("/showTodo")
        }
    });
});

