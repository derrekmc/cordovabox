function asyncForEachNext(items, iterator, done, spreadAffinityOneToTen) {

    var isArr = Object.prototype.toString.call(items) == '[object Array]';

    // Check the type of the input fields and make sure they are the correct type. If incorrect values are passed. Exit the function by calling done and pass the error.
    if(typeof(items) != 'object' || items === null || items.length === 0 || !isArr) {
        console.error("No list passed");
        if(done){
            done("empty array passed");
        }
        return;
    }

    var todo = items.concat();
    var completedCalled = false;
    var forLoop = null;
    /**
     * Spread is short for affinity spread. This allows for programmatic decompression. In other words it allows the processor to breath by changing the flow in which processes are executed.
     * this is most beneficial in the range 1-10. Each accounting for a millisecond of measured time on the cpu not the actual clock cycle. Adding a randomized built in delay of execution allows
     * the processor enough breathing or head room to accept more request and reply to more connections without flooding the pipeline or bus. 0 being the most important and 10 being Something that doesn't matter.
     * It can afford to "run in the background" in other words. So if you think in terms of foreground and background affinity you would put a multi-player ping zero always at 0 because you want the latency to accurately
     * be represented amount all clients but each server can only support a minimal amount of clients or connections. Where as an image serving server would be a spread of 10 because it would rather have increased latency
     * but make sure it responds to all requests and can handle a high load.
     *
     * Time happens independently of clock cycle. The time
     * on a machine is actually clock cycles. Which is simply how fast a machine can process instructions per cycle and there there is the combine measurement of how many is can process per cycle
     * but this debut
     **/


    var spread = 0;

    if(spreadAffinityOneToTen){
        spread = Math.random()*spreadAffinityOneToTen+1; //Used to prevent a continuous IO block from a strenuous parallel for loop
    }

    function complete(err, result){
        if(completedCalled === true) {
            return;
        }
        completedCalled = true;
        todo = [];
        clearTimeout(forLoop);

        if(done){
            done.apply(done, arguments);
        }
    }

    if(!todo) {
        complete(0, null);
    }else{
        forLoop = setTimeout(
            function next() {
                if(todo.length > 0) {
                    /**
                     * iterator(todo.shift(), next, complete);
                     * iterator(function, next, complete);
                     **/
                        // First variable is the Array.shifted Item (The next iteration of the functions on the to do list)
                        // Second variable is the next() function. The next() function is used inside the loop to immediately jump to the next function in the Array of functions/iterators
                        // The last pass in variable is the complete() function. This function ends the loop immediately and stops all asyncronous executions of itself.
                    iterator(todo.shift(), next, complete);
                }else{
                    complete(0, null); // nothing found/complete was called early so we have reached the end of our array. Exit(Call Complete).
                }
            }, spread);
    }

}

module.exports = asyncForEachNext;

