/**
 * Created by NagarjunaYendluri on 4/12/16.
 */
//define module
var iot = {};
//importing aws iot library

var awsIot = require('aws-iot-device-sdk');

//define myThingName

var myThingName = 'pi_2';

//create thing shadows with keys and certs

var thingShadows = awsIot.thingShadow({

    keyPath: './certs/eb53fb678f-private.pem.key',

    certPath: './certs/eb53fb678f-certificate.pem.crt',

    caPath: './certs/rootCA.pem',

    clientId: myThingName,

    region: 'us-west-2'

});

//define myThingState

mythingstate = {

    "state": {

        "reported": {

            "ip": "unknown"

        }

    }

}

//handle thingShadow events

thingShadows.on('connect', function() {

    console.log("Connected...");

    console.log("Registering...");

    thingShadows.register( myThingName );

// An update right away causes a timeout error, so we wait about 2 seconds

    setTimeout( function() {

        console.log("Updating my IP address...");

        clientTokenIP = thingShadows.update(myThingName, mythingstate);

        console.log("Update:" + clientTokenIP);

    }, 2500 );

// Code below just logs messages for info/debugging

    thingShadows.on('status',

        function(thingName, stat, clientToken, stateObject) {

            console.log('received '+stat+' on '+thingName+': '+

                JSON.stringify(stateObject));

        });

    thingShadows.on('update',

        function(thingName, stateObject) {

            console.log('received update '+' on '+thingName+': '+

                JSON.stringify(stateObject));

        });

    thingShadows.on('delta',

        function(thingName, stateObject) {

            console.log('received delta '+' on '+thingName+': '+

                JSON.stringify(stateObject));

        });

    thingShadows.on('timeout',

        function(thingName, clientToken) {

            console.log('received timeout for '+ clientToken)

        });

    thingShadows

        .on('close', function() {

            console.log('close');

        });

    thingShadows

        .on('reconnect', function() {

            console.log('reconnect');

        });

    thingShadows

        .on('offline', function() {

            console.log('offline');

        });

    thingShadows

        .on('error', function(error) {

            console.log('error', error);

        });

//Watch for motion detection. high for any movement

    iot.publish = function(value) {

        console.log("publishing to aws");

        // publish message to AWS MQTT topic

        thingShadows.publish('topic/test', value.toString());

        console.log("Published");

    };

});

module.exports = iot;