function asyncParallel(iterator, done, limit, spreadAffinityOneToTen) {
    var list = this.A
    if(typeof(iterator) != 'function' || iterator === null) {
        console.error("No iterator passed");
        if(done){
            done("No iterator passed");
        }
        return;
    }


    var completeCalled = false;
    parallelLimit = limit || 20;
    var limit = 0;
    var parallelFor = [];

    if(!spreadAffinityOneToTen){
        var spread = Math.random() * spreadAffinityOneToTen+1; //Used to prevent a continuous IO block from a strenuous parallel for loop
    }else{
        var spread = 0;
    }

    function complete(){
        if(completeCalled) return;

        completeCalled = true;
        clearInterval(forLoop);

        // This should be an IO block since we are killing all processes and do not want to process one more item.
        parallelFor.forEach(parallelFor, function(element){
            clearInterval(element);
        });

        parallelFor = [];
        delete(parallelFor);

        delete(limit);

        done();
    }

    var forLoop = setInterval(function(){
        if(limit < parallelLimit){
            limit++;
            parallelFor.push(setInterval(function(){
                iterator(complete);
            }, spread));
        }
    }, spread);

}

module.exports = asyncParallel;

