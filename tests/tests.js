var test = require('tape'),
    pathToObjectUnderTest = '../index';

function getCleanTestObject(request){
    delete require.cache[require.resolve(pathToObjectUnderTest)];
    var objectUnderTest = require(pathToObjectUnderTest);
    return objectUnderTest;
}

test('pieree Exists', function (t) {
    t.plan(2);
    var pieree = getCleanTestObject();
    t.ok(pieree, 'pieree Exists');
    t.equals(typeof pieree, 'object',  'pieree is an object');
});

test('pieree.waitFor Exists', function (t) {
    t.plan(2);
    var pieree = getCleanTestObject();
    t.ok(pieree.waitFor, 'pieree.waitFor Exists');
    t.equals(typeof pieree.waitFor, 'function',  'pieree.waitFor is an function');
});

test('pieree.ready Exists', function (t) {
    t.plan(2);
    var pieree = getCleanTestObject();
    t.ok(pieree.ready, 'pieree.ready Exists');
    t.equals(typeof pieree.ready, 'function',  'pieree.ready is an function');
});

test('multiple callbacks are called', function (t) {
    t.plan(2);
    var pieree = getCleanTestObject();

    pieree.waitFor('1234', function(){
        t.pass('1234 happened');
    });
    pieree.waitFor('1234', function(){
        t.pass('1234 happened again');
    });

    pieree.ready('1234');
});

test('callbacks are cleared', function (t) {
    t.plan(1);
    var pieree = getCleanTestObject();

    pieree.waitFor('1234', function(){
        t.pass('1234 happened only once');
    });

    pieree.ready('1234');
    pieree.ready('1234');// does nothing
});

test('only correct callbacks are called', function (t) {
    t.plan(1);
    var pieree = getCleanTestObject();

    pieree.waitFor('1234', function(){
        t.pass('1234 happened');
    });

    pieree.waitFor('5678', function(){
        t.fail('5678 happened');
    });

    pieree.ready('1234');
});


test('additional arguments are passed to callback', function (t) {
    t.plan(6);
    var pieree = getCleanTestObject(),
        testData = { test: 'data'};

    pieree.waitFor('1234', function(data){
        t.equals(data, testData, 'data was passed');
        t.pass('1234 happened');
    });

    pieree.waitFor('5678', function(){
        t.equals(arguments.length, 3, 'all arguments were passed');
        t.equals(arguments[0], 'foo', 'first argument is correct');
        t.equals(arguments[1], 'bar', 'second argument is correct');
        t.equals(arguments[2], 'meh', 'third argument is correct');
    });

    pieree.ready('1234', testData);
    pieree.ready('5678', 'foo', 'bar', 'meh');
});