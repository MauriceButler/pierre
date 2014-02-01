#pierre

A waiter module. Wait for this id to be served then run this function


## Usage

var pieree = require('pieree');

pieree.waitFor('1234', function(){
    console.log('1234 happened');
});

pieree.ready('1234');

