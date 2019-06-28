// class Rest {
//
//     constructor(){
//
//     }
//
//     get (route) {
//         //todo delete
//         log.debug(route, data);
//     }
//
//     put (route, data) {
//         //todo delete
//         log.debug(route, data);
//     }
//
//     post (route, data) {
//         //todo delete
//         log.debug(route, data);
//     }
//
//     delete (route, data) {
//         //todo delete
//         log.debug(route, data);
//     }
// };
//
// // module.exports = {
// //     HEARTBEAT: "heartbeat",
// //     MESSAGE: "msg",
// //     REQUEST: "request",
// //     WELCOME: "welcome",
// //     TIME: "time",
// //     COUNT: "count",
// //     REPLY: "reply",
// //     DATE: "date",
// //     ERROR: "error"
// // };
//
// module.exports = new Rest();
module.exports = {
    
    /**
     * event.on('user', controller(){
     * })
     */
    
    on: 'eventName', // on or event
    
    /**
     * Option 1
     */
    controller: 'EventControllerName',
    
    /**
     * Option 2
     * @param data
     */
    controller: function(data){
        
    },
    
    /**
     * Option 3 and the most compatible option is
     *
     */
    "eventName": function (data, response) {
        
    }
    
    
}