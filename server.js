var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var port = 3030;
var expresSession = require('express-session');
var MongoStore = require('connect-mongo')(expresSession);

// var connection = mongoose.createConnection('mongodb://localhost:27017/testDb');
mongoose.connect('mongodb://localhost:27017/testDb');
var connection = mongoose.connection;

connection.once('connected', function () {
    console.log('-----connected to DB------');

    app.use(bodyParser.json());

    require('./routes/index')(app);

    app.use(expresSession({

    }));

    app.listen(port, function () {
        console.log('server listening on port ' + port);
    });
});

connection.on('error', function (err) {
    console.log('Error', err);

    process.exit(1);
});
