var orders = {};

function waitFor(id, callback){

    if(!orders[id]){
        orders[id] = [];
    }

    orders[id].push(callback);
}

function ready(id){
    if(orders[id]){
        while(orders[id].length){
            orders[id].shift().apply(undefined, Array.prototype.slice.call(arguments, 1));
        }
    }
}

module.exports = {
    waitFor: waitFor,
    ready: ready
};