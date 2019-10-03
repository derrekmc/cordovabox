/**
 * Todo
 * @type {{get /user: {controller: string}, get /user/:id: {controller: string}, put /user/:id: {controller: string}, post /user: {controller: string}, delete /user/:id: {controller: string}}}
 */
module.exports = {
    "get /user":{
        controller: "UserController"
    },
    "get /user/:id":{
        controller: "UserController"
    },
    "put /user/:id":{
        controller: "UserController"
    },
    //
    "post /user":{
        controller: "UserController"
    },
    "delete /user/:id":{
        controller: "UserController"
    },
}