#pierre

A waiter module. Wait for this id to be served then run this function


## Usage

    var pierre = require('pierre');

    pierre.waitFor('1234', function(){
        console.log('1234 happened');
    });

    pierre.ready('1234');

    pierre.waitFor('5678', function(arg1, arg2, arg3){
        console.log('5678 recieved arguments:', arg1, arg2, arg3);
    });

    pierre.ready('5678', 'foo', 'bar', 'meh');


