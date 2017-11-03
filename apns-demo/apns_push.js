var apn = require('apn');

var argv=process.argv.splice(2);

// param
//var param={};
if (argv.length>0){
    var args=argv[0];
    //console.info(args);
    var b=new Buffer(args, 'base64');
    //console.info(b);
    //
    var s=b.toString();
    //console.info(s);
    var args=JSON.parse(s);
    console.info(args);
}


//console.info();
//process.exit();

// Set up apn with the APNs Auth Key
var apnProvider = new apn.Provider({  
     token: {
        //key: 'apns.p8', // Path to the key p8 file
        key: '/your/path/to/apns.p8', // Path to the key p8 file
        keyId: 'KEYID', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
        teamId: 'TEAMID', // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
    },
    production: args.production // Set to true if sending a notification to a production iOS app
});

// Enter the device token from the Xcode console
//var deviceToken = 'f54edf9caf714c53b01a276cff496a81be2a6b48b207f0fb8ebcd3def77db9c7';
//var deviceToken = '5e495e023ccd28f1465f2881edf283d114bbe8491a284ff1e3caa6babe086759';
//var deviceToken = '7a76794fa168f903b1aeea47d292049a5e1295997be1eb58e99bd05600027a8d';
//var deviceToken = '1aee41da1a3bd6f7b3c4a0fc71642c12419f45103764e04609725f9a8294d35e'
//var deviceToken='c2205ca32e1d81152a1cdaf037eb77da753a2e395dbdaf56cea3f58b76bea82c'
var deviceToken=args.deviceToken

// Prepare a new notification
var notification = new apn.Notification();

// Specify your iOS app's Bundle ID (accessible within the project editor)
//notification.topic = 'com.medtrum.EasyFollow';
//notification.topic = 'com.medtrum.Healthcare';
notification.topic = args.topic;

// Set expiration to 1 hour from now (in case device is offline)
notification.expiry = Math.floor(Date.now() / 1000) + 3600;

// Set app badge indicator
//notification.badge = 3;
notification.badge = 0;

// Play ping.aiff sound when the notification is received
//notification.sound = 'ping.aiff';
notification.sound = 'default';

// Display the following message (the actual notification text, supports emoji)
//notification.alert = 'Hello World \u270C';
notification.alert = args.alert;

// Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
//notification.payload = {id: 123};
notification.payload = args.payload;

// Actually send the notification
apnProvider.send(notification, deviceToken).then(function(result) {  
    // Check the result for any failed devices
    console.log(result);
    console.log('finish');
    if (result.failed.length)
    console.log(result.failed[0].response);
    //exit();
    process.exit();
});
console.log('finish2');
