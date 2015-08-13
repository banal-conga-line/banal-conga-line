var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var db = require('./DB/dbparser');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');

var portNum = 8000;

// Start Express server
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// Request handlers
app.use(express.static(__dirname + '/client'));

app.get('/api/user/:UID', function(req, res){
  // receive uid
  // return user object
  var UID = req.params.UID;
  // console.log(req.params.UID);
  db.getUID(UID, function(userData){
    console.log("26", userData);
    res.end(JSON.stringify(userData));
  });
});

app.post('/api/user', function(req, res) {
  // receive user object
  // add it to database
  // respond with 304 - TODO: redirect here or client-side? 
  var userObj = req.body;
  console.log(req.body);
  // console.log("============================>", req.body);
  db.addUser(userObj, function(){
    console.log('hello');
    res.end();
  });
});

app.get('/api/requests/:uid', function(req, res){
  // receive uid
  // return events under uid
  var uid = req.params.uid;
  // console.log(req.params.UID);
  db.getUIDRequests(uid, function(requestsData){
    console.log("49", requestsData);
    res.end(JSON.stringify(requestsData));
  });
});

app.get('/api/requests', function(req, res){
  // right now get all requests TODO filter requests
  // return object of requests
  db.getRequests(function(requests){
    // console.log(requests);
    res.end(JSON.stringify(requests));
  });
});

app.post('/api/request', function(req, res){
  // receive req obj
  // return post it
  // return 304
  var reqObj = req.body;
  db.addrequest(reqObj, function(){
    res.end(200);
  });
});

app.get('/api/events/:uid', function(req, res){
  // receive uid
  // return events under uid
  var uid = req.params.uid;
  // console.log(req.params.UID);
  db.getUIDEvents(uid, function(eventsData){
    console.log("79", eventsData);
    res.end(JSON.stringify(eventsData));
  });
});

app.get('/api/events', function(req, res){
  // return all events as an object
  db.getEvents(function(events){
    res.end(JSON.stringify(events));
  });
});

app.post('/api/event', function(req, res){
  // Receives event obj
  // attempts to post it
  // returns if success
  var eventObj = req.body;
  db.addEvent(eventObj, function(){
    res.end(200);
  });
})



// Set app to listen
app.listen(portNum);

// Export app
module.exports = app;