var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
var port = 9000;

// Database Connection String
var uri = "mongodb+srv://theo123:theo1234@ovp-jowv1.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({extended:true}));

// get function which displays the HomePage.html in the server
app.get('/', function (req,res) {
    res.sendFile('HomePage.html', { root: __dirname } )
})

// Post function that is used to send the input username of the user into the table Users in Mongo
app.post('/OVP', function(req,res){
    var usr = {
        Username: req.body.Username
    };

    // database connection to add the new user
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
        db.collection('Users'). insertOne(usr, function(err, result){
            console.log('User Inserted');
            db.close();
            // then goes to the OVPPage.html 
            res.sendFile('OVPPage.html', { root: __dirname } )
        })
    })
})

// function that is used to send the input URL from the user into the table URLs in Mongo
app.post('/OVPlayer', function(req,res){
    var url = {
        link: req.body.Url_Input
    };

    // database connection to add the new url
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
        db.collection('URLs'). insertOne(url, function(err, result){
            console.log('URL Inserted');
            db.close();
        })
    })
})

// Connects to the localhost:9000 and enstablishing a database connection
var server = app.listen(port, function() {
    // Connect to Mongoose.
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then((test) => {
        console.log("Connected to DB");
    });
    
    // Some output for the interested reader...
    console.log("Listening on " + port);
})