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
            orders[id].shift()();
        }
    }
}

module.exports = {
    waitFor: waitFor,
    ready: ready
};