/* jshint node: true */
'use strict';

var express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    sessions = require( 'client-sessions' ),
    app = express(),
    _getAudio,
    _getImage,
    _startRoute,
    _trySubmission;

var iot = require("./iot");

// Set session information
app.use( sessions({
    cookieName: 'session',
    secret: 'someRandomSecret!',
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
}) );

// Enable CORS
app.use( function( req, res, next ) {
    res.header( 'Access-Control-Allow-Origin', '*' );
    next();
} );

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({ extended: false }) );
// parse application/json
app.use( bodyParser.json() );

// Set public path
app.use( express.static( __dirname + '/public' ) );

_trySubmission = function(req,res,next){
    iot.publish(1);
    res.json(0);
}

var stopPublish = function(req,res,next){
    iot.publish(0);
    res.json(0);
}

// Routes definition
app.get( '/publish', _trySubmission );
app.get('/stop',stopPublish)

module.exports = app;

// API Listening Port
app.listen( process.env.PORT || 8888 );
console.log("Server started at port 8888");
