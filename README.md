#pierre

A waiter module. Wait for this id to be served then run this function


## Usage

    var pieree = require('pieree');

    pieree.waitFor('1234', function(){
        console.log('1234 happened');
    });

    pieree.ready('1234');

    pieree.waitFor('5678', function(arg1, arg2, arg3){
        console.log('5678 recieved arguments:', arg1, arg2, arg3);
    });

    pieree.ready('5678', 'foo', 'bar', 'meh');


