function html(num) {
    switch (num) {
        case 0:
            return `<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="styles/styles.css">
    <style>
    .background {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 1;

        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
    }

    .content {
        position: relative;
        left: 0;
        right: 0;
        z-index: 9999;
        padding: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }

    #credit_iframe {
        border: none;
        height: 80px;
    }

    #internalPage{
        width:100%;
        border:0;
    }
    </style>
</head>

<body>
    <nav class="navbar navbar-default" id="nav">
        <div class="container-fluid">
            <div class="navbar-header navactive">
                <a class="navbar-brand" id="navchild" href="/entry">Study Buddy</a>
            </div>
            <ul class="nav navbar-nav">
                <li class="navchild">
                    <a style="color:white" href="/todo" id="todoLink">
                          <span class="glyphicon glyphicon-log-book"></span>
                          To-Do List
                    </a>
                </li>
                <li>
                    <a style="color:white" class="navchild" href="/calendar" id="calendarLink">
                        <span class="glyphicon glyphicon-calendar"></span>
                        Calendar
                    </a>
                </li>
                <li>
                    <a style="color:white" class="navchild" id="profileLink" href="/profile">
                        <span class="glyphicon glyphicon-user"></span>
                        Profile
                    </a>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a style="color:white" href="/logout" id="navchild">
                        Sign Out
                        <span class="glyphicon glyphicon-log-out"></span>
                    </a>
                </li>
            </ul>
    </nav>`
        case 1:
            return `<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="styles/styles.css">
    <style>
    .background {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 1;

        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
    }

    .content {
        position: relative;
        left: 0;
        right: 0;
        z-index: 9999;
        padding: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }

    #credit_iframe {
        border: none;
        height: 80px;
    }

    #internalPage{
        width:100%;
        border:0;
    }
    </style>
</head>

<body>
    <nav class="navbar navbar-default" id="nav">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" id="navchild" href="/entry">Study Buddy</a>
            </div>
            <ul class="nav navbar-nav">
                <li id="navactive" class="navchild">
                    <a style="color:white" href="/todo" id="todoLink">
                          <span class="glyphicon glyphicon-log-book"></span>
                          To-Do List
                    </a>
                </li>
                <li>
                    <a style="color:white" class="navchild" href="/calendar" id="calendarLink">
                        <span class="glyphicon glyphicon-calendar"></span>
                        Calendar
                    </a>
                </li>
                <li>
                    <a style="color:white" id="profileLink" href="/profile" class="navactive">
                        <span class="glyphicon glyphicon-user"></span>
                        Profile
                    </a>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a style="color:white" href="/logout" id="navchild">
                        Sign Out
                        <span class="glyphicon glyphicon-log-out"></span>
                    </a>
                </li>
            </ul>
    </nav>`
        case 2:
            return `<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="styles/styles.css">
    <style>
    .background {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 1;

        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
    }

    .content {
        position: relative;
        left: 0;
        right: 0;
        z-index: 9999;
        padding: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }

    #credit_iframe {
        border: none;
        height: 80px;
    }

    #internalPage{
        width:100%;
        border:0;
    }
    </style>
</head>

<body>
    <nav class="navbar navbar-default" id="nav">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" id="navchild" href="/entry">Study Buddy</a>
            </div>
            <ul class="nav navbar-nav">
                <li class="navchild">
                    <a style="color:white" href="/todo" id="todoLink">
                          <span class="glyphicon glyphicon-log-book"></span>
                          To-Do List
                    </a>
                </li>
                <li id="navactive">
                    <a style="color:white" class="navchild" href="/calendar" id="calendarLink">
                        <span class="glyphicon glyphicon-calendar"></span>
                        Calendar
                    </a>
                </li>
                <li>
                    <a style="color:white" id="profileLink" href="/profile" class="navactive">
                        <span class="glyphicon glyphicon-user"></span>
                        Profile
                    </a>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a style="color:white" href="/logout" id="navchild">
                        Sign Out
                        <span class="glyphicon glyphicon-log-out"></span>
                    </a>
                </li>
            </ul>
    </nav>`
        case 3:
            return `<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="styles/styles.css">
    <style>
    .background {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 1;

        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
    }

    .content {
        position: relative;
        left: 0;
        right: 0;
        z-index: 9999;
        padding: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }

    #credit_iframe {
        border: none;
        height: 80px;
    }

    #internalPage{
        width:100%;
        border:0;
    }
    </style>
</head>

<body>
    <nav class="navbar navbar-default" id="nav">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" id="navchild" href="/entry">Study Buddy</a>
            </div>
            <ul class="nav navbar-nav">
                <li class="navchild">
                    <a style="color:white" href="/todo" id="todoLink">
                          <span class="glyphicon glyphicon-log-book"></span>
                          To-Do List
                    </a>
                </li>
                <li>
                    <a style="color:white" class="navchild" href="/calendar" id="calendarLink">
                        <span class="glyphicon glyphicon-calendar"></span>
                        Calendar
                    </a>
                </li>
                <li id="navactive">
                    <a style="color:white" id="profileLink" href="" class="navactive">
                        <span class="glyphicon glyphicon-user"></span>
                        Profile
                    </a>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a style="color:white" href="/logout" id="navchild">
                        Sign Out
                        <span class="glyphicon glyphicon-log-out"></span>
                    </a>
                </li>
            </ul>
    </nav>`
    }
}

var navBar = () => {
    return html(0)
}
var navBarTodo = () => {
    return html(1)
}
var navBarCalendar = () => {
    return html(2)
}
var navBarProfile = () => {
    return html(3)
}

exports.navBar = navBar
exports.navBarTodo = navBarTodo
exports.navBarCalendar = navBarCalendar
exports.navBarProfile = navBarProfile