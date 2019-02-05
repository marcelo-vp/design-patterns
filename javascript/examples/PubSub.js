/**
 * Observer Pattern variation:
 * Publish/Subscribe
 */


function PubSub( myObject ) {

    // Storage for topics that can be
    // broadcast or listened to
    var topics = {};

    // A topic identifier
    var subUid = -1;

    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    myObject.publish = function( topic, args ) {

        if ( !topics[topic] ) {
            return false;
        }

        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;

        while( len-- ) {
            subscribers[len].func( topic, args );
        }

        return this;
    };

    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    myObject.subscribe = function( topic, func ) {

        if ( !topics[topic] ) {
            topics[topic] = [];
        }

        var token = ( ++subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });

        return token;

    };

    // Unsubscribe from a specific topic,
    // based on a tokenized reference
    // to the subscription
    myObject.unsubscribe = function( token ) {

        for ( var m in topics ) {
            if ( topics[m] ) {
                for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                    if ( topics[m][i].token === token ) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }

        return this;

    };

};


/**
 * Case One: using the PubSub module
 * to create a message handler
**/
var messageHandler = {};
PubSub(messageHandler);

// A simple message logger that logs topics
// and data received through the subscriber
function messageLogger( topics, data ) {
    console.log( 'Logging: ' + topics + ': ' + data );
}

// Subscribers listen for topics they have subscribed to
// and invoke a callback function once a new notification
// is broadcast on that topic
var subscription = messageHandler.subscribe(
    'inbox/newMessage', messageLogger
);
// The subscriber receives a token, which is 0 in this case,
// since this is the first subscriber
console.log( subscription );

// Publishers are in charge of publishing notifications
// or topics of interest to the application
messageHandler.publish( 'inbox/newMessage', 'Hello World!!' );

// It also works with different kinds of data:
messageHandler.publish( 'inbox/newMessage', [ 'test', 'a', 'b', 'c' ] );
messageHandler.publish( 'inbox/newMessage', {
    sender: 'hello@google.com',
    body: 'Hey again!'
} );

// We can unsubscribe if we wish a subscriber to no longer
// receive notifications
messageHandler.unsubscribe( subscription );

// Once unsubscribed, the subscriber will no longer be able
// to listen out for published topics or notifications
// ** nothing will be logged from now on **
messageHandler.publish( 'inbox/newMessage', 'Hello, are you still there?' );


/**
 * Case Two: using the PubSub module
 * to create a stock grid display
**/
var stockUpdater = {};
PubSub(stockUpdater);

// Return the current local time
function getCurrentTime() {    
    var date = new Date(),
        m = date.getMonth(),
        d = date.getDate(),
        y = date.getFullYear(),
        t = date.toLocaleTimeString().toLowerCase();

    return ( m + '/' + d + '/' + y + ' ' + t );
}

// Add a row of data to the stock grid
function addGridRow( data ) {
    console.log( 'Added a new row with: ' + JSON.stringify(data) );
}

// Update the grid's counter to show the time it was last updated
function updateCounter( data ) {
    console.log( 'Grid was last updated at ' + getCurrentTime() + ' with ' + JSON.stringify(data) );
}

// Update the grid using data passed to our subscribers
function gridUpdate( topic, data ) {

    if ( data !== undefined ) {
        addGridRow( data );
        updateCounter( data );
    }

}

// Create a subscription to the newDataAvailable topic
var subscriber = stockUpdater.subscribe( 'newDataAvailable', gridUpdate );

// Publish changes to the newDataAvailable topic
stockUpdater.publish('newDataAvailable', {
    summary: 'Apple made $5 billion',
    identifier: 'APPL',
    stockPrice: 570.91
});
stockUpdater.publish('newDataAvailable', {
    summary: 'Microsoft made $20 million',
    identifier: 'MSFT',
    stockPrice: 30.85
});
