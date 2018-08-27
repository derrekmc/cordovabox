/**
 *
 * @type {{register: register, route: route}}
 */
module.exports = {
    // this.route('get', '/iac', require('../api/controllers/ExpressRouteController')); // index.html
    // this.route('get', '/', require('../api/controllers/main')); // index.html
    // this.route('get', '/sitemap', require('../api/controllers/main')); // index.html
    //
    // this.route('get', '/api/stats', require('../api/controllers/stats'));
    // this.route('get', '/user/:id', require('../api/controllers/user'));
    // this.route('post', '/user/:id/tip/:value', require('../api/controllers/user').tip);
    //
    // this.route('get', '/room/:name', require('../api/controllers/room').public);
    // this.route('get', '/room/:name/:user', require('../api/controllers/room').public);
    //
    // this.route('get', '/private/:name', require('../api/controllers/room').private); // might want to add restrictions here
    // this.route('get', '/private/:name/:user', require('../api/controllers/room').private); // might want to add restrictions here
    //
    // this.route('get', '/broadcast/:name', require('../api/controllers/room').broadcast);
    // this.route('get', '/broadcast/:name/:user', require('../api/controllers/room').broadcast);
    //
    // this.route('get', '/chat/:name/:user', require('../api/controllers/room').chat);
    //
    // this.route('post', '/auth/jwt/:id/:value', require('../api/controllers/jwt'));
    // this.route('post', '/auth/jwt/secure/:id/:value', require('../api/controllers/jwt').secure);

    "/":{
        method:"get",
        controller: "MainController"
    },

    "/user":{
      method:"get",
      controller: "UserController"
    },

    "/user/:id":{
        method:"get",
        controller: "UserController"
    },

    "/room/:name":{
        method:"get",
        controller: "UserController"
    },

    "/room/:name/:user":{
        method:"get",
        controller: "RoomController"
    },

    "/api/stats":{
        method:"get",
        controller: "StatsController"
    },

    "/iac":{
        method:"get",
        controller: "ExpressRouteController"
    }
};
