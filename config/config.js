module.exports = {

    application: {
        name: "CordovaBox",
        logo: {
            show: true,
            title: "CordovaBox",
            subTitle: ".io"
        }
    },

    security:{

        jwt: {
            public: {
                key: 'publickey'
            },

            secure: {
                key: 'securekey'
            }
        },

        api: {
            public: {
                key: 'secretKey',
                routes: ['/*']
            }
        }
    },

    server: {
        https: false,
        noCache: false,
        port: 3000,
        process:{
            auto_spawn: true,
            threshold: '50%', // 50% Auto spawn new processes until the server reaches the max_spawn
            max_spawn: '75%' // 75% of the available cores on the server
        },
        socketIO: true,
        cluster: false,
        redisSessions: false
    },

    //Store
    dataStore: {
        mongodb:{
            connectURI: process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://govexpedited:bTWVJDgKJaCVDSjnxCzJVvcrmkNRWuM2mgLccdWvJUp8@ds023624.mlab.com:23624/heroku_lht2jnjk'
        },

        redis: {
            connectURI: process.env.REDIS_URL,
            portNumber: 9429,
            host: 'ec2-107-21-120-49.compute-1.amazonaws.com',
            password: 'p87p0s8cabvh216prh5tu30po71',
            database: ''
        }
    },

    paymentGateway: {
        authorizenet: {
            "API_LOGIN_ID": "97esX3Ff",
            "TRANSACTION_KEY": "66az49nD6SU8Tmbu"
        },
        stripe:{
            test:{
                secretKey: 'sk_test_tga5gOWvib4xU9GDJcEdT4F2',
                publishKey: 'pk_test_zSrOID43LSPjDd5okqAHN2Vi'
            },
            production:{
                secretKey: 'sk_live_fP445rXffypJexaYUaAlRVaQ ',
                publishKey: 'pk_live_mmi6Z12XlU3SSVDPRJiqwC5E '
            }
        },
        testMode: false
    },

    thirdParty:{
        mandrill:{
            key: '5-s-l8M5BKI45ojJ-5-Zdg'
        },

        hipchat:{
            key: 'a9aa7461190a47f51accabd3fc4d84',
            rooms:{
                newOrder: 1830957,
                orderUpdates: 1833664,
                codeUpdates: 1839237,
                orderDeclines: 1833668,
                mainRoom: 1449266
            }
        }

    },

    sockets: {
        max_connections: 4000,
        preferred_connections_enabled: true // Preferred connections allow for your max connections to give priority to a premium client distinguished by his given token during authorization.
    },

    site: {
        www: 'www.CordovaBox.io',
        name: 'CordovaBox',
        namespace: this.name + '_',
        public: '',
        rootFolder: 'assets',
        author: "Derrek Cordova",
        rootDomain: "CordovaBox.com",
        favicon: '/images/favicon.ico',
        address: "Delaware",
        copyright: "© Derrek Cordova. All rights reserved. ",
        navigation: {

        },
        blockedIps: ['173.0.36.47', '167.88.84.137', '167.88.84.244', '172.56.12.102', '24.248.60.130', '66.220.236.36']
    },

    api: {
        key: 'yourSecret'
    },

    /**
     * Winston Console logger
     */
    logger:{
        level: 'silly',
        colorize : true,
        timestamp: false,
        transports: []
    },

    globals: {
        lodash: true,
        async: false
    }

};