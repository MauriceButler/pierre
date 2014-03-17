var test = require('grape'),
    pathToObjectUnderTest = '../index';

function getCleanTestObject(request){
    delete require.cache[require.resolve(pathToObjectUnderTest)];
    var objectUnderTest = require(pathToObjectUnderTest);
    return objectUnderTest;
}

test('pierre Exists', function (t) {
    t.plan(2);
    var pierre = getCleanTestObject();
    t.ok(pierre, 'pierre Exists');
    t.equal(typeof pierre, 'object',  'pierre is an object');
});

test('pierre.waitFor Exists', function (t) {
    t.plan(2);
    var pierre = getCleanTestObject();
    t.ok(pierre.waitFor, 'pierre.waitFor Exists');
    t.equal(typeof pierre.waitFor, 'function',  'pierre.waitFor is an function');
});

test('pierre.ready Exists', function (t) {
    t.plan(2);
    var pierre = getCleanTestObject();
    t.ok(pierre.ready, 'pierre.ready Exists');
    t.equal(typeof pierre.ready, 'function',  'pierre.ready is an function');
});

test('multiple callbacks are called', function (t) {
    t.plan(2);
    var pierre = getCleanTestObject();

    pierre.waitFor('1234', function(){
        t.pass('1234 happened');
    });
    pierre.waitFor('1234', function(){
        t.pass('1234 happened again');
    });

    pierre.ready('1234');
});

test('callbacks are cleared', function (t) {
    t.plan(1);
    var pierre = getCleanTestObject();

    pierre.waitFor('1234', function(){
        t.pass('1234 happened only once');
    });

    pierre.ready('1234');
    pierre.ready('1234');// does nothing
});

test('only correct callbacks are called', function (t) {
    t.plan(1);
    var pierre = getCleanTestObject();

    pierre.waitFor('1234', function(){
        t.pass('1234 happened');
    });

    pierre.waitFor('5678', function(){
        t.fail('5678 happened');
    });

    pierre.ready('1234');
});


test('additional arguments are passed to callback', function (t) {
    t.plan(6);
    var pierre = getCleanTestObject(),
        testData = { test: 'data'};

    pierre.waitFor('1234', function(data){
        t.equal(data, testData, 'data was passed');
        t.pass('1234 happened');
    });

    pierre.waitFor('5678', function(){
        t.equal(arguments.length, 3, 'all arguments were passed');
        t.equal(arguments[0], 'foo', 'first argument is correct');
        t.equal(arguments[1], 'bar', 'second argument is correct');
        t.equal(arguments[2], 'meh', 'third argument is correct');
    });

    pierre.ready('1234', testData);
    pierre.ready('5678', 'foo', 'bar', 'meh');
});