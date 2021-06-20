/**
 *
 * @type {{register: register, route: route}}
 */
module.exports = [
    {
        route: '/creed',
        method: 'get',
        controller: 'MemberController',
        action: 'creed',
        policies: []
    },
    {
        route: '/',
        method: 'get',
        controller: 'ApplicationController',
        action: 'homepage',
        policies: []
    },
    {
        route: '/401',
        method: 'get',
        controller: 'ApplicationController',
        action: 'homepage',
        policies: []
    },
    {
        route: '/403',
        method: 'get',
        controller: 'ApplicationController',
        action: 'get',
        policies: []
    },
    {
        route: '/404',
        method: 'get',
        controller: 'ApplicationController',
        action: 'get',
        policies: []
    }
]
